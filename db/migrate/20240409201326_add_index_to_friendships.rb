class AddIndexToFriendships < ActiveRecord::Migration[7.1]
  def change
    add_index :friendships, [:sender_id, :recipient_id, :status], unique: true
  end
end
