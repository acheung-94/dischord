class AddImgPathToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :img_path, :string
  end
end
