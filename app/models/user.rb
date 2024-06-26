# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  display_name    :string
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
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
        allow_nil: true 
    validates :email,
        presence: {message: 'Required'}, 
        uniqueness: {scope: :email, message: 'Account already exists with this email.'},  
        format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Not a valid email format.'}

## ASSOCIATIONS
    has_many :servers,
        dependent: :destroy,
        foreign_key: :owner_id,
        inverse_of: :owner

    has_many :memberships,
        dependent: :destroy,
        inverse_of: :user

    has_many :member_servers, -> { Membership.accepted },
        through: :memberships,
        source: :server

    has_many :channels,
        dependent: :destroy,
        foreign_key: :user_id,
        inverse_of: :user
    
    has_many :server_channels,
        through: :servers,
        source: :channels

    has_many :messages,
        inverse_of: :author,
        foreign_key: :author_id,
        dependent: :destroy

    has_many :received_friendships,
        class_name: :Friendship,
        foreign_key: :recipient_id,
        inverse_of: :recipient,
        dependent: :destroy

    has_many :sent_friendships,
        class_name: :Friendship,
        foreign_key: :sender_id,
        inverse_of: :sender,
        dependent: :destroy

    #outgoing friend requests from this user that are accepted
    has_many :outgoing_friendships, -> { Friendship.accepted },
        through: :sent_friendships, 
        source: :recipient 
    #incoming friend requests that this user accepted.
    has_many :accepted_friendships, -> { Friendship.accepted },
        through: :received_friendships,
        source: :sender

    # incoming requests that this user has rejected (no visibility on users that have rejected them.)
    has_many :blocked_users, -> {Friendship.rejected},
        through: :received_friendships,
        source: :sender

    has_many :blockers, -> {Friendship.rejected},
        through: :sent_friendships,
        source: :recipient    

    has_many :pending_outgoing, -> { Friendship.pending },
        foreign_key: :sender_id,
        inverse_of: :sender,
        dependent: :destroy,
        class_name: :Friendship

    has_many :pending_incoming, -> { Friendship.pending },
        foreign_key: :recipient_id,
        inverse_of: :recipient,
        dependent: :destroy,
        class_name: :Friendship

    has_many :pending_memberships, -> { Membership.pending },
        dependent: :destroy,
        inverse_of: :user,
        class_name: :Membership,
        foreign_key: :user_id

    has_many :accepted_requests, -> { Friendship.accepted },
        class_name: :Friendship,
        foreign_key: :recipient_id,
        inverse_of: :recipient,
        dependent: :destroy

    has_many :requests_accepted, -> { Friendship.accepted },
        class_name: :Friendship,
        foreign_key: :sender_id,
        inverse_of: :sender,
        dependent: :destroy
    has_one_attached :avatar
    
## UTILS 
    scope :search_by_username, -> (username) { where("username LIKE ?", "%#{username}%") }

    def self.find_by_credentials(credential, password)
        credential_type = credential.match?( URI::MailTo::EMAIL_REGEXP ) ? :email : :username
        user = User.find_by(credential_type => credential)
        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    def self.filtered_user_results(username, current_user)
        friend_ids = current_user.friends.pluck(:id) #can't search friends
        enemy_ids = current_user.enemies.pluck(:id) #can't search enemies
        pending_ids = current_user.pending #can't search pending
        bad_ids = [current_user.id] + friend_ids + enemy_ids + pending_ids #can't search themselves
        self.where("username LIKE ?", "%#{username}%")
            .where.not(id: bad_ids ) 
    end
    
    def friends
        self.outgoing_friendships + self.accepted_friendships
    end

    def pending
        self.pending_incoming.pluck(:sender_id) + self.pending_outgoing.pluck(:recipient_id)
    end

    def enemies
        self.blocked_users + self.blockers
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
