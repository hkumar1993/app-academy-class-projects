# == Schema Information
#
# Table name: bands
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  band_image_url :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class BandTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
