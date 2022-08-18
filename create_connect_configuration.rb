require 'docusign_esign'
require 'yaml'

$SCOPES = [
     "signature", "impersonation"
]

def load_config_data
  config_file_path = 'config/appsettings.yml'
  begin
    config_file_contents = File.read(config_file_path)
  rescue Errno::ENOENT
    $stderr.puts "Missing config/appsettings.yml file, see README.md for details."
    raise
  end
  YAML.unsafe_load(config_file_contents)
end

def get_consent
  url_scopes = $SCOPES.join('+');
  # Construct consent URL
  redirect_uri = "https://developers.docusign.com/platform/auth/consent";
  consent_url = "https://#{CONFIG["aud"]}/oauth/auth?response_type=code&" +
                "scope=#{url_scopes}&client_id=#{CONFIG["jwt_integration_key"]}&" +
                "redirect_uri=#{redirect_uri}"

  puts "Open the following URL in your browser to grant consent to the application:"
  puts consent_url
  puts "Consent granted? \n 1)Yes \n 2)No"
  continue = gets;
  if continue.chomp == "1"
    return true;
  else
    puts "Please grant consent"
    exit
  end
end

def authenticate
  configuration = DocuSign_eSign::Configuration.new
  configuration.debugging = true
  api_client = DocuSign_eSign::ApiClient.new(configuration)
  api_client.set_oauth_base_path(CONFIG["aud"])

  rsa_pk = 'config/docusign_private_key.txt'
  begin
    token = api_client.request_jwt_user_token(CONFIG["jwt_integration_key"], CONFIG["impersonated_user_guid"], rsa_pk, expires_in=3600, $SCOPES)
    user_info_response = api_client.get_user_info(token.access_token)
    account = user_info_response.accounts.find(&:is_default)

    account_info = {
      access_token: token.access_token,
      account_id: account.account_id,
      base_path: account.base_uri
    }
    account_info
  rescue OpenSSL::PKey::RSAError => exception
    Rails.logger.error exception.inspect
    if File.read(rsa_pk).starts_with? '{RSA_PRIVATE_KEY}'
      fail "Please add your private RSA key to: #{rsa_pk}"
    else
      raise
    end
  rescue DocuSign_eSign::ApiError => exception
    body = JSON.parse(exception.response_body)
    if body['error'] == "consent_required"
      authenticate if get_consent
    else
      puts "API Error"
      puts body['error']
      puts body['message']
      exit
    end
  end
end

def construct_api_headers(api_client, token)
  api_client.default_headers["Authorization"] = "Bearer #{token}"
  api_client.default_headers["Content-Type"] = "application/json;charset=UTF-8"
  api_client.default_headers["Accept"] = "application/json, text/plain, */*"
  api_client.default_headers["Accept-Encoding"] = "gzip, deflate, br"
  api_client.default_headers["Accept-Language"] = "en-US,en;q=0.9"
end

def create_connect_config(account_info)
  configuration = DocuSign_eSign::Configuration.new
  configuration.host = account_info[:base_path]
  api_client = DocuSign_eSign::ApiClient.new configuration
  construct_api_headers(api_client, account_info[:access_token])

  connect_api = DocuSign_eSign::ConnectApi.new api_client

  puts "Please enter the url to publish to (If working locally this should be in the format \
https://{YOUR_NGROK_HOST}.ngrok.io/api/docusign/trigger/do_process.json. See README.md for details): "
  url_to_publish = gets.chomp

  puts "Please enter a name for your new DocuSign Connect custom configuration: "
  configuration_name = gets.chomp

  connect_api = DocuSign_eSign::ConnectApi.new api_client


  connect_event_data = DocuSign_eSign::ConnectEventData.new(
    version: "restv2.1",
    includeData: [
      "custom_fields",
      "recipients"
    ]
  )

  connect_configuration = DocuSign_eSign::ConnectCustomConfiguration.new(
    name: configuration_name,
    urlToPublishTo: url_to_publish,
    enableLog: "true",
    envelopeEvents: [
      "Sent",
      "Delivered",
      "Completed",
      "Declined",
      "Voided"
    ],
    eventData: connect_event_data,
    allowEnvelopePublish: "true",
    allUsers: "true",
    allUsersExcept: "false",
    configurationType: "custom",
    deliveryMode: "sim",
    events: [
      "click-agreed",
      "click-declined",
      "envelope-corrected",
      "recipient-resent",
      "recipient-finish-later",
      "envelope-deleted"
    ],
    recipientEvents: [
      "Sent",
      "Delivered",
      "Declined",
      "Completed",
      "AutoResponded"
    ],
    signMessageWithX509Certificate: "true"
  )
  connect_api.create_configuration(account_info[:account_id], connect_configuration)
end

def list_connect_configs(account_info)
  configuration = DocuSign_eSign::Configuration.new
  configuration.host = account_info[:base_path]
  api_client = DocuSign_eSign::ApiClient.new configuration
  construct_api_headers(api_client, account_info[:access_token])

  connect_api = DocuSign_eSign::ConnectApi.new api_client

  connect_api.list_configurations(account_info[:account_id])
end


def main
  account_info = authenticate
  puts create_connect_config(account_info)
  # puts list_connect_configs(account_info)
  puts "DONE"
end

CONFIG = load_config_data["default"]
main
