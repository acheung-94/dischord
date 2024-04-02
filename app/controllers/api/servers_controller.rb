class Api::ServersController < ApplicationController
    before_action :require_logged_in
    
    def index
        @user = current_user
        render :index
    end
    
    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        if @server.save
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
        params.require(:server).permit(:name, :img_path)
    end

    def find_server
        Server.find_by(id: params[:id])
    end
end
