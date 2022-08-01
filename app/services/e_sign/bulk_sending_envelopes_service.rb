# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength
module ESign
  # Service for sending Bulk Envelopes
  class BulkSendingEnvelopesService
    attr_reader :args, :signers

    include ApiCreator

    def initialize(args, signers)
      @args = args
      @signers = signers
    end

    # rubocop:disable Metrics/AbcSize
    def worker
      configuration = DocuSign_eSign::Configuration.new
      configuration.host = args[:base_path]
      api_client = DocuSign_eSign::ApiClient.new configuration
      construct_api_headers(api_client, args)

      bulk_envelopes_api = DocuSign_eSign::BulkEnvelopesApi.new api_client
      bulk_sending_list = create_bulk_sending_list(signers)
      bulk_list = bulk_envelopes_api.create_bulk_send_list(args[:account_id], bulk_sending_list)
      bulk_list_id = bulk_list.list_id

      envelope_api = create_envelope_api(args)
      envelope_definition = make_envelope
      envelope = envelope_api.create_envelope(args[:account_id],
                                              envelope_definition,
                                              DocuSign_eSign::CreateEnvelopeOptions.default)
      envelope_id = envelope.envelope_id

      envelope_api.create_custom_fields(args[:account_id], envelope_id, custom_fields(bulk_list_id))

      bulk_send_request = DocuSign_eSign::BulkSendRequest.new(envelopeOrTemplateId: envelope_id)
      batch = bulk_envelopes_api.create_bulk_send_request(args[:account_id], bulk_list_id, bulk_send_request)
      batch_id = batch.batch_id
      bulk_envelopes_api.get_bulk_send_batch_status(args[:account_id], batch_id)
    end
    # rubocop:enable Metrics/AbcSize

    private

    def construct_api_headers(api_client, args)
      api_client.default_headers["Authorization"] = "Bearer #{args[:access_token]}"
      api_client.default_headers["Content-Type"] = "application/json;charset=UTF-8"
      api_client.default_headers["Accept"] = "application/json, text/plain, */*"
      api_client.default_headers["Accept-Encoding"] = "gzip, deflate, br"
      api_client.default_headers["Accept-Language"] = "en-US,en;q=0.9"
    end

    def create_bulk_sending_list(signers)
      bulk_copies = []

      signers.each do |signer_hash|
        recipient = DocuSign_eSign::BulkSendingCopyRecipient.new(
          roleName: "signer",
          tabs: [],
          name: signer_hash["name"],
          email: signer_hash["email"]
        )

        bulk_copy = DocuSign_eSign::BulkSendingCopy.new(
          recipients: [recipient],
          custom_fields: []
        )

        bulk_copies << bulk_copy
      end

      DocuSign_eSign::BulkSendingList.new(
        name: "sample.csv",
        bulkCopies: bulk_copies
      )
    end

    def custom_fields(bulk_list_id)
      text_custom_fields = DocuSign_eSign::TextCustomField.new(
        name: "mailingListId",
        required: "false",
        show: "false",
        value: bulk_list_id
      )

      DocuSign_eSign::CustomFields.new(
        listCustomFields: [],
        textCustomFields: [text_custom_fields]
      )
    end

    def make_envelope
      envelope_definition = DocuSign_eSign::EnvelopeDefinition.new
      envelope_definition.email_subject = "Please sign this document"
      tabs = DocuSign_eSign::Tabs.new
      tabs.sign_here_tabs = [sign_here]
      tabs.date_tabs = [date_here]
      signer = init_signer
      signer.tabs = tabs
      recipients = DocuSign_eSign::Recipients.new(signers: [signer])
      envelope_definition.recipients = recipients
      envelope_definition.documents = [doc]
      envelope_definition.envelope_id_stamping = "true"
      envelope_definition.status = "created"
      envelope_definition
    end

    def init_signer
      DocuSign_eSign::Signer.new(
        name: "Multi Bulk Recipient::signer",
        email: "multiBulkRecipients-signer@docusign.com",
        roleName: "signer",
        note: "",
        routingOrder: 1,
        status: "created",
        templateAccessCodeRequired: "null",
        deliveryMethod: "email",
        recipientId: "1",
        recipientType: "signer"
      )
    end

    def sign_here
      DocuSign_eSign::SignHere.new(
        anchorString: "Signature:",
        anchorUnits: "pixels",
        anchorXOffset: "70",
        anchorYOffset: "7"
      )
    end

    def date_here
      DocuSign_eSign::DateSigned.new(
        anchorString: "Date:",
        anchorUnits: "pixels",
        anchorXOffset: "30",
        anchorYOffset: "-4",
        value: Time.zone.today.strftime("%m/%d/%Y")
      )
    end

    def doc
      pdf_filename = "Activity_Waiver_Form.pdf"
      doc = DocuSign_eSign::Document.new
      doc.document_base64 = Base64.encode64(File.binread(File.join("data", pdf_filename)))
      doc.name = "Activity Waiver Form"
      doc.file_extension = "pdf"
      doc.document_id = "2"
      doc
    end
  end
end
# rubocop:enable Metrics/ClassLength
