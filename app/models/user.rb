class User < ApplicationRecord
    before_validation :ensure_session_token
    has_secure_password
    validates :username,
        uniqueness: true,
        length: { in: 3..100 },
        format: { without: URI::MailTo::EMAIL_REGEXP, message: 'Username can\'t be an email' }
    validates :password, 
        length: {minimum: 6},
        allow_nil: true
    validates :email, 
        uniqueness: true, 
        length: { in: 3..100 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }

    def self.find_by_credentials(credential, password)
        credential_type = credential.match?( URI::MailTo::EMAIL_REGEXP ) ? :email : :username
        user = User.find_by(credential_type => credential)
        if user&.authenticate(password)
            user
        else
            nil
        end
    end
    
    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
        session_token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    private

    def generate_session_token
        loop do
            token = SecureRandom::urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end
