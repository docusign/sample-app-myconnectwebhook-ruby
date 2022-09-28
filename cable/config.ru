# frozen_string_literal: true

require ::File.expand_path("../config/environment", __dir__)
Rails.application.eager_load!

run ActionCable.server
