class CreateUserStreams < ActiveRecord::Migration[6.0]
  def change
    create_table :user_streams do |t|
      t.references :user,null: false, foreign_key: true
      t.references :streams,null: false, foreign_key: true
      t.timestamps
    end
  end
end
