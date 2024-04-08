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
            render :show
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
            render :show
        else
            render json: {errors: @message.errors}, status: 422
        end        
    end

    def destroy
        @message = find_message
        if @message&.author == current_user
            @message.destroy
            head :no_content
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
