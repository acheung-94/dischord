json.user do
    json.extract! @user, :id, :email, :username, :img_path, :display_name, :created_at, :updated_at
end

json.servers do 
    json.array! @user.member_servers.map(&:id)
end

# if @user.avatar.attached?
#     json.avatarUrl url_for(@user.avatar)
# end