# frozen_string_literal: true

module Api
  module Docusign
    # Controller for processing DS Trigger pushes
    class TriggerController < Api::ApiController
      # API endpoint which processes Trigger from DS.
      def do_process
        return if params[:event].blank?

        # we assume its a clickwrap
        if params[:event].include?("click")
          process_clickwrap
        else
          process_envelope
        end
      end

      private

      # generic Envelope processing method
      def process_envelope
        custom_fields = params[:data][:envelopeSummary][:customFields]
        # if custom fields are present, we assume its a batchId, and its an Envelope from BulkSend example
        # if not - its an Envelope from Clickwrap confirmation
        if custom_fields
          process_batch_envelope
        else
          process_clickwrap_envelope
        end
      end

      # process Envelope which was sent as Clickwrap confirmation
      # rubocop:disable Metrics/AbcSize
      def process_clickwrap
        event = params[:event]
        raise "User declined Clickwrap" unless event == "click-agreed"

        agreement_id = params[:data][:agreementId]
        clickwrap = Clickwrap.find_by(agreement_id:)
        raise "No clickwrap in DB agreement_id=#{agreement_id}" unless clickwrap

        docusign_result = clickwrap.send_confirmation_envelope
        raise "Envelope creation failed" unless docusign_result.status == "sent"

        clickwrap.confirmation_envelope_id = docusign_result.envelope_id
        clickwrap.confirmation_envelope_sent_at = docusign_result.status_date_time
        clickwrap.confirmation_envelope_status = docusign_result.status
        clickwrap.save!
        Rails.logger.info("Clickwrap confirmation enveloper successfully sent.")
      rescue StandardError => e
        Rails.logger.info("ERROR")
        Rails.logger.info(e)
      end
      # rubocop:enable Metrics/AbcSize

      # process Envelope which was sent via BulkSend
      # rubocop:disable Metrics/AbcSize
      def process_batch_envelope
        custom_fields = params[:data][:envelopeSummary][:customFields]
        text_custom_fields = custom_fields[:textCustomFields]
        custom_field_batch_id = text_custom_fields.detect { |field_hash| field_hash[:name] == "BulkBatchId" }

        batch_id = custom_field_batch_id[:value]
        envelope_id = params[:data][:envelopeId]
        signer_hash = params[:data][:envelopeSummary][:recipients][:signers][0]
        signer_email = signer_hash[:email]
        # signer_status = signer_hash[:status]
        signer_status = params[:event]

        envelope = BulkSendEnvelope.find_by(batch_id:, signer_email:)
        raise "No envelope in DB batch_id=#{batch_id} envelope_id=#{envelope_id} signer_email=#{signer_email}" unless envelope

        envelope.envelope_id = envelope_id if envelope.envelope_id.blank?
        envelope.status = signer_status
        envelope.save!
      rescue StandardError => e
        Rails.logger.debug "ERROR"
        Rails.logger.debug e
      end
      # rubocop:enable Metrics/AbcSize

      # it is possible to do some logic after the user has signed the Confirmation Envelope here
      def process_clickwrap_envelope; end
    end
  end
end
