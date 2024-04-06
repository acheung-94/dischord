json.extract! @message, :id, :body, :author_id, :channel_id, :created_at, :updated_at
json.author @message.author.username
json.timestamp @message.created_at.to_time.strftime('%l:%M %p')
#add clause for attached images