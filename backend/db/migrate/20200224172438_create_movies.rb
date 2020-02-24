class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.text, :title
      t.string :stream
      t.references :stream,null: false, foreign_key: true

      t.timestamps
    end
  end
end
