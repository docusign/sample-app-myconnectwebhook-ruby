# frozen_string_literal: true

# Controller for handling sessions
class SessionController < ApplicationController
  # GET /auth/:provider/callback
  def create
    redirect_url = session[:return_to] || root_path
    internal_destroy

    Rails.logger.debug { "\n==> Docusign callback Authentication response:\n#{auth_hash.to_yaml}\n" }
    str = "==> Login: New token for admin user which will expire at: #{Time.zone.at(auth_hash.credentials['expires_at'])}"
    Rails.logger.info(str)
    store_auth_hash_from_docusign_callback
    create_user_by_session

    redirect_to redirect_url
  end

  # GET /auth/failure
  def omniauth_failure
    error_msg = "OmniAuth authentication failure message: " \
                "#{params[:message]} for strategy: #{params[:strategy]} and " \
                "HTTP_REFERER: #{params[:origin]}"
    Rails.logger.warn("\n==> #{error_msg}")
    flash[:notice] = error_msg
    redirect_to root_path
  end

  def index
    Rails.logger.debug { "==> Session:\n#{session.to_h.to_yaml}" }
    render json: session.to_json
  end

  def destroy
    internal_destroy
    render json: { status: "SUCCESS", messages: ["Logged out"] }
  end

  protected

  # rubocop:disable Metrics/AbcSize
  def store_auth_hash_from_docusign_callback
    session[:ds_expires_at]   = auth_hash.credentials["expires_at"]
    session[:ds_user_name]    = auth_hash.info.name
    session[:ds_access_token] = auth_hash.credentials.token
    session[:ds_account_id]   = auth_hash.extra.account_id
    session[:ds_account_name] = auth_hash.extra.account_name
    session[:ds_base_path]    = auth_hash.extra.base_uri
  end
  # rubocop:enable Metrics/AbcSize

  # returns hash with key structure of:
  # - provider
  # - uid
  # - info: [name, email, first_name, last_name]
  # - credentials: [token, refresh_token, expires_at, expires]
  # - extra: [sub, account_id, account_name, base_uri]
  def auth_hash
    @auth_hash ||= request.env["omniauth.auth"]
  end
end
