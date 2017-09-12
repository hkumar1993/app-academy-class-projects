# == Schema Information
#
# Table name: albums
#
#  id              :integer          not null, primary key
#  title           :string           not null
#  album_image_url :string
#  year            :string           not null
#  band_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Album < ApplicationRecord
  validates :title, :year, :band_id, presence: true

  belongs_to :band,
    primary_key: :id,
    foreign_key: :band_id,
    class_name: :Band

  has_many :tracks,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: :Track
end
