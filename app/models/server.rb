# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  img_path   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
    validates :name, :owner_id, presence: true
    #no validations on uniqueness. 
    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id,
        primary_key: :id

    has_many :memberships,
        dependent: :destroy,
        inverse_of: :server

    has_many :members,
        through: :memberships,
        source: :user

    has_many :channels,
        dependent: :destroy,
        inverse_of: :server,
        foreign_key: :server_id
    
    has_one_attached :server_icon
end