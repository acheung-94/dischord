json.extract! @friendship, :id, :sender_id, :recipient_id, :status

json.sender @friendship.sender.username
json.recipient @friendship.recipient.username