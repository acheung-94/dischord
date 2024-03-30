class Api::SessionsController < ApplicationController
    before_action :require_logged_in, only: [:destroy]
    before_action :require_logged_out, only: [:create]

    def show
        @user = current_user
        if @user
            render template: 'api/users/show'
        else
            render json: {user: nil}
        end
    end

    def create
        credential = params[:credential]
        password = params[:password]
        @user = User.find_by_credentials(credential, password)
        if @user
            log_in(@user)
            render template: 'api/users/show'
        else
            render json: {errors: 'Login or password is invalid'}, status: 422
        end
    end

    def destroy
        log_out
        head :no_content
    end

end
