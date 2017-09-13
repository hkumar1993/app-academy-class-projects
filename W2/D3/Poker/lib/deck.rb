require_relative 'card'

class Deck

  attr_reader :cards

  def initialize
    @cards = []
    Card.suits.each do |suit|
      Card.ranks.each do |rank|
        @cards << Card.new(rank, suit)
      end
    end
  end

  def take(n=1)
    shuffle!
    arr = @cards.take(n)
    @cards = @cards.drop(n)
    arr
  end

  def shuffle!
    @cards.shuffle!
  end



end
