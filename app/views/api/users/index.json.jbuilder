
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
            if member.avatar.attached?
                json.avatarUrl url_for(member.avatar)
            end
        end
    end
end
