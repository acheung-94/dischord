json.extract! @channel, :id, :name
if @channel.server_id
    json.server_id @channel.server_id
else
    json.user_id @channel.user_id
end