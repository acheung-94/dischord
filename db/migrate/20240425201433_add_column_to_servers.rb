class AddColumnToServers < ActiveRecord::Migration[7.1]
  def change
    add_column :servers, :default_channel_id, :bigint
    add_foreign_key :servers, :channels, column: :default_channel_id
    add_index :servers, :default_channel_id
  end
end
