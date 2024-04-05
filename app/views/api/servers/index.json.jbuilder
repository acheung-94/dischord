#json.extract! @user, :username

@user.member_servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name, :owner_id
        json.members server.members.map(&:id)
        json.channels server.channels.map(&:id)
        if server.server_icon.attached?
            json.iconUrl url_for(server.server_icon)
        end
    end
end

