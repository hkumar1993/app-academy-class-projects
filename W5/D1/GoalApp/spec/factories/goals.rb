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

FactoryGirl.define do
  factory :goal do
    
  end
end
