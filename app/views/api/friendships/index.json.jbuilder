json.pendingOut do 
    @current_user.pending_outgoing.each do |request|
        json.set! request.id do
            json.extract! request, :id, :sender_id, :recipient_id, :status

            json.sender request.sender.username
            json.recipient request.recipient.username
        end
    end
end

json.pendingIn do 
    @current_user.pending_incoming.each do |request|
        json.set! request.id do
            json.extract! request, :id, :sender_id, :recipient_id, :status

            json.sender request.sender.username
            json.recipient request.recipient.username
        end
    end
end

json.accepted do 
    @current_user.friends.each do |friend|
        json.set! friend.id do
            json.extract! friend, :id, :username, :display_name
            json.joinDate friend.created_at.to_time.strftime('%B %e, %Y')
            if friend.avatar.attached?
                json.avatarUrl url_for(friend.avatar)
            end
        end
    end
end

json.rejected do
    @current_user.rejected_friendships.each do |rejected|
        json.set! rejected.id do
            json.extract! rejected, :id, :username, :display_name
            json.joinDate rejected.created_at.to_time.strftime('%B%_e,%Y')
            if rejected.avatar.attached?
                json.avatarUrl url_for(rejected.avatar)
            end
        end
    end
end