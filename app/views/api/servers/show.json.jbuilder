json.extract! @server, :id, :name, :owner_id

if @server.server_icon.attached?
    json.icon_url url_for(@server.server_icon)
end

json.members do
    json.array! @server.members.map(&:id)
end

json.channels do
    json.array! @server.channels.map(&:id)
end

json.pendingMembers do
    json.array! @server.pending_members.map(&:id)
end