# frozen_string_literal: true

# class for handling Users
class User < ApplicationRecord
  has_many :bulk_send_envelopes, dependent: :destroy
  has_many :clickwraps, dependent: :destroy

  validates :session_id, uniqueness: true

  def create_bulk_send_envelopes(signers, batch_id)
    signers.each do |signer_hash|
      bulk_send_envelopes.create!(
        batch_id:,
        signer_name: signer_hash[:name],
        signer_email: signer_hash[:email]
      )
    end
  end

  def send_message_via_websocket(message)
    UserMessageRelayJob.perform_later(self, message)
  end
end

# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  session_id :string
#
# Indexes
#
#  index_users_on_session_id  (session_id) UNIQUE
#
