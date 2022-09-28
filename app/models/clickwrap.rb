# frozen_string_literal: true

# class for handling Clickwraps
class Clickwrap < ApplicationRecord
  belongs_to :user

  def send_confirmation_envelope
    fake_session = {}
    JwtAuth::JwtCreator.new(fake_session).check_jwt_token

    envelope_args = {
      signer_email:,
      signer_name:,
      status: "sent",
      doc_path: File.join("data", "Purchase_Confirmation.pdf")
    }
    args = {
      account_id: fake_session[:ds_account_id],
      base_path: fake_session[:ds_base_path],
      access_token: fake_session[:ds_access_token],
      envelope_args:
    }
    ESign::SendEnvelopeService.new(args).worker
  end
end

# == Schema Information
#
# Table name: clickwraps
#
#  id                            :bigint           not null, primary key
#  agreed_on                     :datetime
#  confirmation_envelope_sent_at :datetime
#  confirmation_envelope_status  :string
#  signer_email                  :string
#  signer_name                   :string
#  status                        :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  agreement_id                  :string
#  confirmation_envelope_id      :string
#  user_id                       :integer
#
