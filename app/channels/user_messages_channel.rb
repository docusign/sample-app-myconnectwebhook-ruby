# frozen_string_literal: true

# ActionCable Channel config
class UserMessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "users:#{current_user.session_id}:messages"
  end

  def unsubscribed
    stop_all_streams
  end
end
