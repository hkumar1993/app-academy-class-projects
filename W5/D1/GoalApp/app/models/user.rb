# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  attr_reader :password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence:true
  validates :password, length: { minimum:6, allow_nil: true }
  before_validation :ensure_session_token

  has_many :goals,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Goal

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end

end
