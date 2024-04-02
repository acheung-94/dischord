
json.servers do
    @user.all_member_servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name
            json.members server.members.map(&:id)
        end
    end

    @user.all_owned_servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name
            json.members server.members.map(&:id)
        end
    end

end
