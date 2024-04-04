class CreateServers < ActiveRecord::Migration[7.1]
  def change
    create_table :servers do |t|
      t.string :name, null:false, index:true
      t.references :owner, null:false, foreign_key: {to_table: :users}
      t.string :imgPath
      t.timestamps
    end
  end
end
