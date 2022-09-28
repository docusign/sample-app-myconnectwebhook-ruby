# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_08_093407) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bulk_send_envelopes", force: :cascade do |t|
    t.integer "user_id"
    t.string "batch_id"
    t.string "envelope_id"
    t.string "status"
    t.string "signer_name"
    t.string "signer_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clickwraps", force: :cascade do |t|
    t.integer "user_id"
    t.string "signer_name"
    t.string "signer_email"
    t.string "status"
    t.string "agreement_id"
    t.datetime "agreed_on"
    t.datetime "confirmation_envelope_sent_at"
    t.string "confirmation_envelope_id"
    t.string "confirmation_envelope_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_users_on_session_id", unique: true
  end

end
