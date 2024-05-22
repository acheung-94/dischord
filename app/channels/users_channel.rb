class UsersChannel < ApplicationCable::Channel
    def subscribed
        puts 'users channel subscribed!'
        stream_for current_user
    end

    def unsubscribed
    end
end