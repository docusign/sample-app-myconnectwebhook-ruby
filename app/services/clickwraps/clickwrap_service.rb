# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength
module Clickwraps
  # Service for sending Bulk Envelopes
  class ClickwrapService
    attr_reader :args

    include ApiCreator

    def initialize(args)
      @args = args
    end

    # rubocop:disable Metrics/AbcSize
    def worker
      configuration = DocuSign_Click::Configuration.new
      configuration.host = args[:base_path]
      api_client = DocuSign_Click::ApiClient.new configuration
      construct_api_headers(api_client, args)

      accounts_api = DocuSign_Click::AccountsApi.new(api_client)

      clickwrap_options = DocuSign_Click::GetClickwrapsOptions.new()
      clickwrap_options.name = "MyConnectWebhook-clickwrap"

      clickwraps = accounts_api.get_clickwraps(
        args[:account_id],
        clickwrap_options
      )

      if clickwraps.clickwraps.empty?
        clickwrap_request = make_clickwrap
        results = accounts_api.create_clickwrap(args[:account_id], clickwrap_request)
        clickwrap_id = results.clickwrap_id
      else
        clickwrap_id = clickwraps.clickwraps[0].clickwrap_id
      end

      clickwrap_id
    end
    # rubocop:enable Metrics/AbcSize

    private

    def construct_api_headers(api_client, args)
      api_client.default_headers["Authorization"] = "Bearer #{args[:access_token]}"
    end

    def make_clickwrap
      display_settings = DocuSign_Click::DisplaySettings.new(
        consentButtonText: 'I Agree',
        hasDeclineButton: true,
        displayName: 'Purchase License',
        sendToEmail: true,
        format: 'modal',
        hasAccept: true,
        mustRead: true,
        requireAccept: true,
        size: 'medium',
        documentDisplay: 'document'
      )

      # Read file from a local directory
      # The reads could raise an exception if the file is not available!
      doc_pdf = "Granted_License_Agreements.pdf"
      doc_b64 = Base64.encode64(File.binread(File.join('data', doc_pdf)))

      # Create the document model.
      documents = [
        DocuSign_Click::Document.new(
          documentBase64: doc_b64,
          documentName: 'Purchase License',
          fileExtension: 'pdf',
          order: 0
        )
      ]

      # Create a clickwrap request model
      clickwrap_request = DocuSign_Click::ClickwrapRequest.new(
        displaySettings: display_settings,
        documents: documents,
        name: "MyConnectWebhook-clickwrap",
        requireReacceptance: true
      )

      clickwrap_request
    end
  end
end
# rubocop:enable Metrics/ClassLength
