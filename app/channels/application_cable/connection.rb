# frozen_string_literal: true

module ApplicationCable
  # Websocket connection class
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # In case you want to connect websocket to port 3000,
      # the session will be available from cookies
      #
      # pp request.session[:session_id]
      # self.current_user = find_verified_user(request.session[:session_id])

      # We are using different port (28080), which means we are not getting cookies automatically.
      # In this case we use GET parameter.
      #
      # pp request.fullpath
      session_id = request.fullpath.split("?")[1].split("=")[1]
      self.current_user = find_verified_user(session_id)

      logger.add_tags "ActionCable", current_user
    end

    protected

    def find_verified_user(session_id)
      verified_user = User.find_by(session_id:)
      verified_user || reject_unauthorized_connection
    end
  end
end
