@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :author_id, :channel_id, :created_at, :updated_at
        if message.images.attached?
            json.array! url_for(message.images) #really not sure if this is the right syntax
        end
    end
end