class AddWeightToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :weight, :integer, default: 1, null: false
  end
end
