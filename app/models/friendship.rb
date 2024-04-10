class Friendship < ApplicationRecord
  validates :status, inclusion: {in: %w(accepted pending rejected)}
  validates :sender_id, uniqueness: {scope: [:recipient_id]}
  validates :recipient_id, uniqueness: {scope: [:sender_id]}
  validate :not_already_accepted, :not_self, :not_pending, :not_rejected, on: :create
  #I THINK THAT'LL DO IT, DON'T YOU? LOL
  belongs_to :sender,
    class_name: :User,
    foreign_key: :sender_id,
    primary_key: :id

  belongs_to :recipient,
    class_name: :User,
    foreign_key: :recipient_id,
    primary_key: :id

  scope :accepted, -> { where(status: :accepted) }
  scope :rejected, -> { where(status: :rejected) }
  scope :pending, -> { where(status: :pending) }

  def not_already_accepted
    condition_1 = {sender_id: self.recipient_id, recipient_id: self.sender_id, status: 'accepted'}
    condition_2 = {sender_id: self.sender_id, recipient_id: self.recipient_id, status: 'accepted'}
    if Friendship.exists?(condition_1) || Friendship.exists?(condition_2)
      errors.add(:base, 'already friends')
    end
  end

  def not_self
    if self.sender_id == self.recipient_id
      errors.add(:base, 'Cannot send requests to yourself')
    end
  end

  def not_pending
    condition_1 = {sender_id: self.recipient_id, recipient_id: self.sender_id, status: 'pending'}
    condition_2 = {sender_id: self.sender_id, recipient_id: self.recipient_id, status: 'pending'}
    if Friendship.exists?(condition_1) || Friendship.exists?(condition_2)
      errors.add(:base, 'already pending')
    end
  end

  def not_rejected
    condition_1 = {sender_id: self.recipient_id, recipient_id: self.sender_id, status: 'rejected'}
    condition_2 = {sender_id: self.sender_id, recipient_id: self.recipient_id, status: 'rejected'}
    if Friendship.exists?(condition_1) || Friendship.exists?(condition_2)
      errors.add(:base, 'already rejected')
    end
  end

end
