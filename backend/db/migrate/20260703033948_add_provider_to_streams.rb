class AddProviderToStreams < ActiveRecord::Migration[6.0]
  def change
    add_column :streams, :provider, :string
    add_column :streams, :tmdb_provider_name, :string
  end
end
