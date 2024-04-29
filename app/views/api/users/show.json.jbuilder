json.user do
    json.extract! @user, :id, :email, :username, :display_name, :created_at, :updated_at
    if @user.avatar.attached?
        json.avatarUrl url_for(@user.avatar)
    end
end

# json.servers do 
#     json.array! @user.member_servers.map(&:id)
# end

# json.channels do
#     json.array! @user.channels.map(&:id)
# end
