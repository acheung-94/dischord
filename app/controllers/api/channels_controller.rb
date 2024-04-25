class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names + ['serverId', 'userId']
    
    def index #all messages for a server
        server_id = params[:server_id]

        if server_id == '@me'
            @user_channels = current_user.channels

        else
            @server = Server.find_by(id: server_id)

        end
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            render json: {errors: @channel.errors }, status: 422
        end
    end

    def show
        @channel = find_channel
        if @channel
            render :show
        else
            render json: {errors: 'Could not find channel'}, status: 404
        end
    end

    def update
        @channel = find_channel

        if @channel&.update(channel_params)
            render :show
        else
            render json: {errors: @channel.errors}, status: 422
        end
    end

    def destroy
        @channel = find_channel

        if @channel&.destroy
            head :no_content
        else
            render json: {errors: 'Could not find channel'}, status: 422
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :user_id, :server_id)
    end

    def find_channel
        Channel.find_by(id: params[:id])
    end
end
