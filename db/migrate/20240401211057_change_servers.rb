class ChangeServers < ActiveRecord::Migration[7.1]
  def change
    rename_column :servers, :imgPath, :img_path
  end
end
