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

require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { User.new(username: 'jonsnow', password: 'bendtheknee')}

  describe "User validation" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "User associations" do
    it { should have_many(:goals) }
    it "has many friends"
  end


  describe '::find_by_credentials' do
    before(:each) do
      user.save!
    end

    let(:correct_creds) { User.find_by_credentials('jonsnow','bendtheknee')}
    let(:incorrect_creds) { User.find_by_credentials('jonsnow','notastark')}

    it "finds user with correct username and password" do
      expect(correct_creds == user).to be_truthy
    end

    it "returns nil if user not found" do
      expect(incorrect_creds == user).to be_falsey
    end

  end

end
