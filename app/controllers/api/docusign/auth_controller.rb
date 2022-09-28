# frozen_string_literal: true

module Api
  module Docusign
    # Controller for Auth with DS JWT preconfigured account
    class AuthController < Api::ApiController
      before_action :set_return_to, only: [:jwt_auth]

      # API endpoint used to make JWT auth.
      # No page reload required.
      def jwt_auth
        internal_destroy

        if JwtAuth::JwtCreator.new(session).check_jwt_token
          status = "SUCCESS"
          messages = ["JWT Auth Success"]
          redirect_url = session[:return_to] || root_url
          create_user_by_session
        else
          status = "ERROR"
          messages = ["Consent Required"]
          session["omniauth.state"] = SecureRandom.hex
          redirect_url = JwtAuth::JwtCreator.consent_url(session["omniauth.state"], session["examples_API"])
        end

        render json: { status:, messages:, redirect_url: }
      end
    end
  end
end
