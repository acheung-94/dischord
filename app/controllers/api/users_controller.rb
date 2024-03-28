class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password'] #allows nesting of password under :user key, for the rest, Rails will find a column and automatically nest any matching attributes under 'user'.
    before_action :require_logged_out, only: [:create]

    def create
        @user = User.new(user_params)
        if @user.save
            log_in(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end


    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end
