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

require 'rails_helper'

RSpec.describe Goal, type: :model do
  describe "Goal Validations" do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:user_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
  end
end
