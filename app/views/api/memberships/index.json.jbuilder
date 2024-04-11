@memberships.each do |membership|
    json.set! membership.id do
        json.extract! membership, :id, :server_id, :user_id, :status
        json.username membership.user.username
        json.serverName membership.server.name
        if membership.server.server_icon.attached?
            json.iconUrl url_for(membership.server.server_icon)
        end
    end
end