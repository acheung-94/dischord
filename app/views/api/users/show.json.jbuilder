json.user do
    json.extract! @user, :id, :email, :username, :img_path, :display_name, :created_at, :updated_at
end

# json.owned_servers do
#     json.array! @user.all_owned_servers.map(&:id)
# end

# json.member_servers do
#     json.array! @user.all_member_servers.map(&:id)
# end
json.servers do 
    json.array! @user.member_servers.map(&:id)
end