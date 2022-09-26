# frozen_string_literal: true

require_relative "boot"
# See https://github.com/rails/rails/blob/v7.0.3/railties/lib/rails/all.rb for the list
require "rails"
# skipped:
# active_storage/engine
# action_mailer/railtie
# action_mailbox/engine
# rails/test_unit/railtie
# action_text/engine

%w[
  active_record/railtie
  action_controller/railtie
  active_job/railtie
  action_view/railtie
  action_cable/engine
].each do |railtie|
  require railtie
rescue LoadError => e
  Rails.logger.error(e.message)
end

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SampleAppMyConnectWebhookRuby
  # Rails Application config
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.app_url = "http://localhost:3000" # The public url of the application.

    # Init DocuSign configuration, loaded from config/appsettings.yml file
    DOCUSIGN_CONFIG = YAML.load_file(Rails.root.join("config/appsettings.yml"))[Rails.env]
    DOCUSIGN_CONFIG.map do |k, v|
      config.send("#{k}=", v)
    end

    config.action_controller.default_protect_from_forgery = false # unless ENV["RAILS_ENV"] == "production"

    # config.cache_store = :memory_store, { size: 64.megabytes }

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
