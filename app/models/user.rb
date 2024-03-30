class User < ApplicationRecord
    before_validation :ensure_session_token
    has_secure_password
    validates :username,
        presence: {message: 'Required'},
        uniqueness: {scope: :username, message: 'This username has already been taken.'},
        length: { in: 2..32, message: 'This must be 2-32 characters.' },
        format: { without: URI::MailTo::EMAIL_REGEXP, message: 'Username can\'t be an email' }
    validates :password,
        presence: {message: 'Required'},
        length: {minimum: 6, message: 'Too short - minimum 6 characters'},
        allow_nil: true #where is the "can't be blank message" coming from??"
    validates :email,
        presence: {message: 'Required'}, 
        uniqueness: {scope: :email, message: 'Account already exists with this email.'},  
        format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Not a valid email format.'}

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
