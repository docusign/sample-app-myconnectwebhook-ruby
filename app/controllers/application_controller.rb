# frozen_string_literal: true

# main Controller
class ApplicationController < ActionController::Base
  def set_return_to
    session[:return_to] = params[:return_to] if params[:return_to].present?
  end

  private

  def time_in_words(duration)
    "#{Object.new.extend(ActionView::Helpers::DateHelper).distance_of_time_in_words(duration)}#{duration.negative? ? ' ago' : ''}"
  end

  # rubocop:disable Metrics/AbcSize
  def check_token(buffer_in_min = 10)
    buffer = buffer_in_min * 60
    expires_at = session[:ds_expires_at]
    remaining_duration = expires_at.nil? ? 0 : expires_at - buffer.seconds.from_now.to_i
    if expires_at.nil?
      Rails.logger.info "==> Token expiration is not available: fetching token"
    elsif remaining_duration.negative?
      Rails.logger.debug do
        "==> Token is about to expire in #{time_in_words(remaining_duration)} at: #{Time.zone.at(expires_at)}: fetching token"
      end
    else
      Rails.logger.debug { "==> Token is OK for #{time_in_words(remaining_duration)} at: #{Time.zone.at(expires_at)}" }
    end
    remaining_duration.positive?
  end
  # rubocop:enable Metrics/AbcSize

  def check_auth
    minimum_buffer_min = 10
    token_ok = check_token(minimum_buffer_min)
    render json: { status: "ERROR", messages: ["Sorry, you need to authenticate."] }, status: :unauthorized unless token_ok
  end

  def handle_docusign_api_error(err)
    error = JSON.parse(err.response_body)
    error_code = err.code || error["errorCode"]
    error_message = error["error_description"] || error["message"]
    render json: { status: "ERROR", messages: ["An error has occurred."], error: { code: error_code, message: error_message } },
           status: :bad_request
  end

  def handle_error(messages, status)
    render json: { status: "ERROR", messages: }, status:
  end

  def current_user
    User.find_by(session_id: session[:session_id])
  end

  def create_user_by_session
    User.find_or_create_by(session_id: session[:session_id])
  end

  def destroy_user_by_session
    User.find_by(session_id: session[:session_id])&.destroy
  end

  def internal_destroy
    destroy_user_by_session
    reset_session
  end
end
