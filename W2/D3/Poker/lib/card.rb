class Card
  attr_reader :rank, :suit, :face_up

  def initialize(rank, suit)
    raise ArgumentError unless Card.ranks.include?(rank)
    raise ArgumentError unless Card.suits.include?(suit)
    @rank = rank
    @suit = suit
    @face_up = false
  end

  def switch_face
    @face_up = !@face_up
  end

  def self.suits
    [:H, :D, :S, :C]
  end

  def self.ranks
    (1..13).to_a
  end

  def <=> (card)
    @rank <=> card.rank
  end
end
