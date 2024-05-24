class UsersChannel < ApplicationCable::Channel
    def subscribed
        puts 'users channel subscribed!'
        puts current_user.username
        stream_for current_user
    end

    def unsubscribed
    end
end