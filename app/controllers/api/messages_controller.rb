class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names + ['authorId', 'channelId']
    
    def index #all messages for a channel
        @channel = Channel.find_by(id: params[:channel_id])
        if @channel
            @messages = @channel.messages.includes(:author)
            render :index
        else
            render json: {errors: 'Channel not found'}, status: 404
        end
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            ChannelsChannel.broadcast_to(@message.channel, {
                id: @message.id,
                body: @message.body,
                authorId: @message.author_id,
                channelId: @message.channel_id,
                attachmentUrl: @message.attachment.attached? ? url_for(@message.attachment) : nil,
                author: @message.author.username,
                timestamp: @message.created_at.to_time.localtime.strftime('%l:%M %p'),
                date: @message.created_at.to_time.localtime.strftime('%B %_e, %Y')
            })
            # render :show
        else
            render json: {errors: @message.errors}, status: 422
        end
    end

    def show
        @message = find_message
    end

    def update
        @message = find_message
        if @message&.update(message_params)
            ChannelsChannel.broadcast_to(@message.channel, {
                id: @message.id,
                body: @message.body,
                authorId: @message.author_id,
                channelId: @message.channel_id,
                attachmentUrl: @message.attachment.attached? ? url_for(@message.attachment) : nil,
                author: @message.author.username,
                timestamp: @message.created_at.to_time.localtime.strftime('%l:%M %p'),
                date: @message.created_at.to_time.localtime.strftime('%B %_e, %Y')
            })
        else
            render json: {errors: @message.errors}, status: 422
        end        
    end

    def destroy
        @message = find_message
        if @message&.author == current_user
            @message.destroy
            ChannelsChannel.broadcast_to(@message.channel, {
                type: 'delete',
                messageId: @message.id
            })
        else
            render json: {errors: 'Not yours to delete'}, status: 401
        end
    end

    private
    def message_params
        params.require(:message).permit(:id, :body, :author_id, :channel_id, :attachment)
    end

    def find_message
       @message = Message.find_by(id: params[:id])
    end

end


