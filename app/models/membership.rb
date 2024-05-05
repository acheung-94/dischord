# == Schema Information
#
# Table name: memberships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Membership < ApplicationRecord
    validates :server_id, presence: true
    validates :status, inclusion: {in: %w(accepted pending rejected)}
    validates :user_id, presence: true, uniqueness: {scope: :server_id}
    
    belongs_to :user

    belongs_to :server

    scope :accepted, -> { where(status: :accepted) }
    scope :rejected, -> { where(status: :rejected) }
    scope :pending, -> { where(status: :pending) }
end
