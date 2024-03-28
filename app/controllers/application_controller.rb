class ApplicationController < ActionController::API

    before_action :snake_case_params
    def current_user
        token = session[:session_token]
        @current_user ||= User.find_by(session_token: token)
    end

    def require_logged_in
        unless logged_in?
            render json: {errors: ['Must be logged in']}, status: 401
        end
    end

    def require_logged_out
        if logged_in?
            render json: {errors: ['Must be logged out']}, status: 401
        end
    end

    def logged_in?
        !!current_user
    end

    def log_in(user)
        session[:session_token] = user.reset_session_token!
    end

    def log_out
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
