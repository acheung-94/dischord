json.extract! @server, :id, :name, :owner_id

json.members do
    json.array! @server.members.map(&:id)
end

json.channels do
    json.array! @server.channels.map(&:id)
end