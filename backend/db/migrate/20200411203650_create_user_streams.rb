class CreateUserStreams < ActiveRecord::Migration[6.0]
  def change
    create_table :user_streams do |t|
      t.references :user, null: false, foreign_key: true
      t.references :stream, null: false, foreign_key: true
      t.boolean :selected, null:false, :default => "true"

      t.timestamps
    end
  end
end
