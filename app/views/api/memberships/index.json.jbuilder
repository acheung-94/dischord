if @user_memberships
    @user_memberships.each do |membership|
        json.set! membership.id do
            json.extract! membership, :id, :server_id, :user_id, :status
            json.username membership.user.username
            json.serverName membership.server.name
            if membership.server.server_icon.attached?
                json.iconUrl url_for(membership.server.server_icon)
            end
        end
    end
end

if @server_memberships
    @server_memberships.each do |membership|
        json.set! membership.id do
            json.extract! membership, :id, :server_id, :user_id, :status
            json.username membership.user.username
            json.displayName membership.user.display_name
            json.avatarUrl url_for(membership.user.avatar)
            json.memberSince membership.created_at.to_time.localtime.strftime('%B %_e, %Y')
            json.accountCreated membership.user.created_at.to_time.localtime.strftime('%B %_e, %Y')
        end 
    end
end
