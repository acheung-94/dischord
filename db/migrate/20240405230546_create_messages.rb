class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.references :author, null: false, index:true, foreign_key: {to_table: :users}
      t.text :body, null:false
      t.references :channel, null: false, index:true, foreign_key: true

      t.timestamps
    end
  end
end
