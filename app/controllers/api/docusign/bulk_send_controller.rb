# frozen_string_literal: true

module Api
  module Docusign
    # Controller for DS Bulk Send
    class BulkSendController < Api::ApiController
      before_action :check_auth, only: %i[process_envelopes envelopes_status]

      # API endpoint for BulkSend
      # rubocop:disable Metrics/AbcSize
      def process_envelopes
        signers = params[:signers].to_a
        return handle_error(["Please provide signers."], 400) if signers.empty?

        current_user.bulk_send_envelopes.destroy_all if current_user.bulk_send_envelopes.any?

        args = {
          account_id: session["ds_account_id"],
          base_path: session["ds_base_path"],
          access_token: session["ds_access_token"]
        }
        bulk_send_result = ESign::BulkSendingEnvelopesService.new(args, signers).worker

        if bulk_send_result.failed == "0"
          current_user.create_bulk_send_envelopes(signers, bulk_send_result.batch_id)
          render json: { status: "SUCCESS", messages: ["Envelope sent"], docusign_response: bulk_send_result }
        else
          handle_error("Bulk Send failed.", 500)
        end
      rescue DocuSign_eSign::ApiError => e
        handle_docusign_api_error(e)
      end
      # rubocop:enable Metrics/AbcSize
    end
  end
end
