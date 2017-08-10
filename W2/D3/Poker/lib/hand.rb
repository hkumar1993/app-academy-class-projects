class Hand

  attr_reader :cards, :rank

  def initialize(cards)
    @cards = cards
    @rank = 10
  end

  def high_card
    @rank = 9
  end

  def one_pair

    high_card

  end

  private
  # def find_pairs
  #   pairs = []
  #
  #   (0..3).each do |i|
  #     (i..4).each do |j|
  #       compare = (@cards[i] <=> @cards[j])
  #       pairs << [@card]
  #     end
  #   end
  # end
end
