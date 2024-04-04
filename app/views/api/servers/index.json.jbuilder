#json.extract! @user, :username

@user.member_servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name, :owner_id
        json.members server.members.map(&:id)
    end
end

