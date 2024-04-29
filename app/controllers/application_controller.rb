class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception
    before_action :snake_case_params
    before_action :attach_auth_token
    
    def current_user
        token = session[:session_token]
        @current_user ||= User.includes(
            :member_servers,
             :avatar, 
             :channels, 
             :pending_outgoing, 
             :pending_incoming, 
             :friends,
             :enemies).find_by(session_token: token)
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
    def attach_auth_token
        headers['X-CSRF-Token'] = form_authenticity_token
    end

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
