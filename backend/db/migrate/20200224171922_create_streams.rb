class CreateStreams < ActiveRecord::Migration[6.0]
  def change
    create_table :streams do |t|
      t.text :name

      t.timestamps
    end
  end
end
