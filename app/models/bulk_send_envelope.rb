# frozen_string_literal: true

# class for handling Bulk Sends
class BulkSendEnvelope < ApplicationRecord
  belongs_to :user

  after_commit :notify_user_via_websocket, on: [:update]

  def notify_user_via_websocket
    message = { signer_name:, signer_email:, status:, updated_at: }
    user.send_message_via_websocket(message)
  end
end

# == Schema Information
#
# Table name: bulk_send_envelopes
#
#  id           :bigint           not null, primary key
#  signer_email :string
#  signer_name  :string
#  status       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  batch_id     :string
#  envelope_id  :string
#  user_id      :integer
#
