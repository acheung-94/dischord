class AddColumnToMemberships < ActiveRecord::Migration[7.1]
  def change
    add_column :memberships, :status, :string, null: false
  end
end
