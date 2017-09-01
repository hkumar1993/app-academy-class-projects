# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  attr_reader :password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  has_many :posts,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Post

  has_many :comments,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Comment



  def self.find_by_credentials(u,p)
    user = User.find_by(username: u)
    return nil unless user
    user.is_password?(p) ? user : nil
  end

  def password=(p)
    @password = p
    self.password_digest = BCrypt::Password.create(p)
  end

  def is_password?(p)
    BCrypt::Password.new(self.password_digest).is_password?(p)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end

end
