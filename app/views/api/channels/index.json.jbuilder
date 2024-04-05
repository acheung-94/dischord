if @server
    json.channels do
        @server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :id, :name, :server_id
            end
        end
    end
end

if @user_channels
    json.channels do
        @user_channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :id, :name, :user_id
            end
        end
    end
end