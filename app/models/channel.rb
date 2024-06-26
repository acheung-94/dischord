# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :bigint
#  server_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
  validates :name, presence: true, length: {maximum: 100}, uniqueness: {scope: :server_id, message: "Oops! Looks like there's already a channel with that name."}
  
  belongs_to :user,
    optional: true

  belongs_to :server,
    optional: true

  has_many :messages,
    inverse_of: :channel,
    dependent: :destroy
end
