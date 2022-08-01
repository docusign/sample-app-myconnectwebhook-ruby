# frozen_string_literal: true

# class for creating DS API instances
module ApiCreator
  def create_initial_api_client(host: nil, client_module: DocuSign_eSign, debugging: false)
    configuration = client_module::Configuration.new
    configuration.debugging = debugging
    api_client = client_module::ApiClient.new(configuration)
    api_client.set_oauth_base_path(host)
    api_client
  end

  def create_api_by_class_name(args, class_name)
    configuration = DocuSign_eSign::Configuration.new
    configuration.host = args[:base_path]
    api_client = DocuSign_eSign::ApiClient.new(configuration)
    api_client.default_headers["Authorization"] = "Bearer #{args[:access_token]}"
    "DocuSign_eSign::#{class_name}Api".constantize.new(api_client)
  end

  def create_envelope_api(args)
    create_api_by_class_name(args, "Envelopes")
  end
end
