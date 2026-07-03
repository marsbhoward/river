class AddRefreshDateToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :refresh_date, :datetime
  end
end
