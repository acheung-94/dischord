#json.extract! @user, :username
json.servers do
    @user.member_servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name, :owner_id
            json.members server.members.map(&:id)
        end
    end

end
