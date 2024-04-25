class Api::ServersController < ApplicationController
    before_action :require_logged_in
    wrap_parameters include: Server.attribute_names + ['serverIcon']
    def index
        @user = current_user
        render :index
    end
    
    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        if @server.save
            default_channel = Channel.create(server_id: @server.id, name: 'general')
            @server.default_channel_id = default_channel.id
            @server.save
            Membership.create(server_id: @server.id, user_id: @server.owner_id, status: 'accepted')
            render :show
        else
            render json: {errors: @server.errors}, status: 422
        end
    end

    def show
        @server = find_server
        if @server
            render :show
        else
            render json: {errors: 'Could not find a server with that name'}, status: 404
        end
    end

    def update
        @server = find_server
        if @server&.update(server_params)
            render :show
        else
            render json: {errors: @server.errors}, status: 422
        end
    end

    def destroy
        @server = find_server
        if @server&.owner == current_user
            @server.destroy
            head :no_content
        else
            render json: {errors: "#{@server.name} is not yours to delete."}, status: 401
        end
                
    end

    private
    def server_params
        params.require(:server).permit(:name, :server_icon)
    end

    def find_server
        Server.find_by(id: params[:id])
    end
end
