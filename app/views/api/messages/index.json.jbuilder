@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :author_id, :channel_id, :created_at, :updated_at
        json.author message.author.display_name
        json.timestamp message.created_at.to_time.localtime.strftime('%l:%M %p')
        json.date message.created_at.to_time.localtime.strftime('%B %_e, %Y')
        if message.attachment.attached?
            json.attachmentUrl url_for(message.attachment) #really not sure if this is the right syntax
        end
    end
end