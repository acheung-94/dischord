json.extract! @channel, :id, :name
if @channel.server_id
    json.serverId @channel.server_id
else
    json.userId @channel.user_id
end