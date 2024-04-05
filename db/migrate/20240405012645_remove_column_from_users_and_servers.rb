class RemoveColumnFromUsersAndServers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :img_path
    remove_column :servers, :img_path
  end
end
