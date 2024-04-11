module ApplicationCable
  class Connection < ActionCable::Connection::Base
        # identified_by :current_user

        def connect

        end
    
        def disconnect
    
        end
    
        # private
        # def find_verified_user
        #   user = User.find_by(session_token: request.session[:session_token])
        #   if user
        #     user
        #   else
        #     reject_unauthorized_connection
        #   end
        # end
  end
end
