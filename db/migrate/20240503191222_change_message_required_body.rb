class ChangeMessageRequiredBody < ActiveRecord::Migration[7.1]
  def change
    change_column :messages, :body, :string, null:true
  end
end
