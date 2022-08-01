# frozen_string_literal: true

class AddInitTables < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :session_id
      t.timestamps
    end

    add_index :users, :session_id, unique: true

    create_table :bulk_send_envelopes do |t|
      t.integer :user_id
      t.string :batch_id
      t.string :envelope_id
      t.string :status
      t.string :signer_name
      t.string :signer_email
      t.timestamps
    end

    create_table :clickwraps do |t|
      t.integer :user_id
      t.string :signer_name
      t.string :signer_email
      t.string :status
      t.string :agreement_id
      t.datetime :agreed_on

      t.datetime :confirmation_envelope_sent_at
      t.string :confirmation_envelope_id
      t.string :confirmation_envelope_status
      t.timestamps
    end
  end
end
