# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  body       :text             not null
#  channel_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  validates :body, presence: true

  # ASSOCIATIONS
  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :channel

  has_many_attached :images

  # UTILS
end
