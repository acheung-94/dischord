class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password'] #allows nesting of password under :user key, for the rest, Rails will find a column and automatically nest any matching attributes under 'user'.
    before_action :require_logged_out, only: [:create]
    ICON_COLORS = %w(blurple gold gray green magenta red) 
    def create
        @user = User.new(user_params)
        color = ICON_COLORS.sample
        file = File.open("frontend/src/assets/icons/avatar-#{color}.png")
        @user.avatar.attach(io: file, filename: "#{color}.png")
        if @user.save
            log_in(@user)
            render :show
        else
            render json: @user.errors, status: 422
        end
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user
            render :show
        else
            render json: {errors: 'Unable to find user'}, status: 404
        end
    end

    def index
        username = params[:username] #query string
        server_id = params[:server_id] #query string
        if username
            # @users = User.search_by_username(username) #find users
            @users = User.filtered_user_results(username, current_user)
        end
        if server_id
            @server = Server.find_by(id: server_id)
            #@server.includes(:memberships) #fetch server members
        end
        
        render :index
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

end
