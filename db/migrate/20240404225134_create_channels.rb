class CreateChannels < ActiveRecord::Migration[7.1]
  def change
    create_table :channels do |t|
      t.string :name, null: false, index: true
      t.references :user, index: true, foreign_key: true
      t.references :server, index: true, foreign_key: true

      t.timestamps
    end
  end
end
