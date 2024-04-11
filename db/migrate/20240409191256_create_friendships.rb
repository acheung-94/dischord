class CreateFriendships < ActiveRecord::Migration[7.1]
  def change
    create_table :friendships do |t|
      t.string :status, null: false
      t.references :sender, null: false, foreign_key: {to_table: :users}
      t.references :recipient, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
