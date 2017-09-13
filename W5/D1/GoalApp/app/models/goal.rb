# == Schema Information
#
# Table name: goals
#
#  id                :integer          not null, primary key
#  title             :string
#  description       :text
#  privacy_status    :boolean
#  completion_status :boolean
#  user_id           :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Goal < ApplicationRecord
  validates :title, :user_id, presence: true
  after_initialize :default_values
  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  def default_values
    privacy_status = false
    completion_status = false
  end

end
