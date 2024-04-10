
if @users
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :username, :display_name, :created_at, :updated_at
            if user.avatar.attached?
                json.avatarUrl url_for(user.avatar)
            end
        end
    end
end

if @server
    @server.members.each do |member|
        json.set! member.id do
            json.extract! member, :id, :email, :username, :display_name, :created_at, :updated_at
            json.accountCreated member.created_at.to_time.localtime.strftime('%B %e, %Y')
            if member.avatar.attached?
                json.avatarUrl url_for(member.avatar)
            end
            if member.id == @server.owner_id
                json.owner true
            end
        end
    end
end
