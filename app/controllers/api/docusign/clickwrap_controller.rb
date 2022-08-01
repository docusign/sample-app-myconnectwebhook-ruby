# frozen_string_literal: true

module Api
  module Docusign
    # Controller for DS Clickwrap processing on BE
    class ClickwrapController < Api::ApiController
      before_action :check_auth, only: %i[init_params store_data]

      def init_params
        render json: {
          clickwrap_environment: session[:ds_base_path],
          clickwrap_account_id: session[:ds_account_id],
          clickwrap_id: Rails.configuration.clickwrap_id,
          client_user_id: "#{session[:session_id]}-#{Time.now.to_i}"
        }
      end

      # rubocop:disable Metrics/AbcSize
      # rubocop:disable Metrics/CyclomaticComplexity
      def store_data
        signer_name = params[:signer_name]
        signer_email = params[:signer_email]
        status = params[:status]
        agreement_id = params[:agreement_id]
        agreed_on = params[:agreed_on]

        all_params_present = signer_name.present? && signer_email.present? && status.present? &&
                             agreement_id.present? && agreed_on.present?
        return handle_error(["Not all params present"], 400) unless all_params_present

        clickwrap = current_user.clickwraps.find_by(agreement_id:)
        return handle_error(["Duplicate agreement"], 400) if clickwrap

        current_user.clickwraps.create!(signer_name:, signer_email:, status:, agreement_id:, agreed_on:)
        render json: { status: "SUCCESS" }
      rescue DocuSign_eSign::ApiError => e
        handle_docusign_api_error(e)
      rescue StandardError => e
        handle_error([e.message], 500)
      end
      # rubocop:enable Metrics/AbcSize
      # rubocop:enable Metrics/CyclomaticComplexity
    end
  end
end
