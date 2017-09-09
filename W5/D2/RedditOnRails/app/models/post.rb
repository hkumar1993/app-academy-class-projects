# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#

class Post < ApplicationRecord
  attr_reader :sub_ids
  validates :title, presence: true
  validates :sub_ids, presence: { message: "Must have at least one sub"}
  after_save :create_sub_associations

  has_many :post_subs, dependent: :destroy

  has_many :comments, dependent: :destroy

  has_many :subs,
    through: :post_subs,
    source: :sub

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  def sub_ids=(sub_ids)
    @sub_ids = sub_ids.map(&:to_i)
  end

  def create_sub_associations
    @sub_ids.each do |sub_id|
      PostSub.create(sub_id: sub_id, post_id: self.id)
    end
  end


end
