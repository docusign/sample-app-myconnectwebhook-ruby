# frozen_string_literal: true

module ESign
  # Service for sending Envelope
  class SendEnvelopeService
    attr_reader :args

    include ApiCreator

    def initialize(args)
      @args = args
    end

    def worker
      envelope_definition = make_envelope(args[:envelope_args])
      envelope_api = create_envelope_api(args)
      envelope_api.create_envelope(args[:account_id], envelope_definition)
    end

    private

    def make_envelope(envelope_args)
      envelope_definition = DocuSign_eSign::EnvelopeDefinition.new
      envelope_definition.email_subject = "Please sign this document set"
      doc = Base64.encode64(File.binread(envelope_args[:doc_path]))
      document = DocuSign_eSign::Document.new(
        documentBase64: doc,
        name: "Purchase Confirmation",
        fileExtension: "pdf",
        documentId: "3"
      )

      envelope_definition.documents = [document]
      signer = get_signer(envelope_args)
      signer.tabs = get_tabs(envelope_args)

      recipients = DocuSign_eSign::Recipients.new(signers: [signer])
      envelope_definition.recipients = recipients
      envelope_definition.status = envelope_args[:status]
      envelope_definition
    end

    def get_signer(envelope_args)
      signer = DocuSign_eSign::Signer.new
      signer.email = envelope_args[:signer_email]
      signer.name = envelope_args[:signer_name]
      signer.recipient_id = "1"
      signer.routing_order = "1"
      signer
    end

    def get_tabs(envelope_args)
      tabs = DocuSign_eSign::Tabs.new
      tabs.sign_here_tabs = [sign_here]
      tabs.date_tabs = [date_here]
      tabs.full_name_tabs = [name_here(envelope_args[:signer_name])]
      tabs.email_tabs = [email_here(envelope_args[:signer_email])]
      tabs
    end

    def sign_here
      DocuSign_eSign::SignHere.new(
        anchorString: "Signature",
        anchorYOffset: "10",
        anchorUnits: "pixels",
        anchorXOffset: "60"
      )
    end

    def date_here
      DocuSign_eSign::Date.new(
        anchorString: "Date",
        anchorYOffset: "-4",
        anchorUnits: "pixels",
        anchorXOffset: "40",
        value: Time.zone.today.strftime("%m/%d/%Y")
      )
    end

    def name_here(name)
      DocuSign_eSign::FullName.new(
        anchorString: "Name",
        anchorUnits: "pixels",
        anchorYOffset: "-3",
        anchorXOffset: "40",
        value: name
      )
    end

    def email_here(email)
      DocuSign_eSign::Email.new(
        anchorString: "Email",
        anchorYOffset: "-3",
        anchorUnits: "pixels",
        anchorXOffset: "40",
        value: email
      )
    end
  end
end
