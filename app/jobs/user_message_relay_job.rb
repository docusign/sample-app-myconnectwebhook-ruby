# frozen_string_literal: true

# Job for sending data via websocket.
class UserMessageRelayJob < ApplicationJob
  def perform(user, message)
    ActionCable.server.broadcast("users:#{user.session_id}:messages", message)
  end
end
