require_relative 'card.rb'

class Board

  attr_reader :grid

  def initialize(arr = nil )
    arr ||= Array.new(4) { Array.new(4) }
    @grid = arr
    populate
  end

  def init_deck
    size = @grid.flatten.length
    max = size/2
    @deck = []
    (0...max).each do |n|
      2.times { @deck << Card.new(n) }
    end
  end

  def populate
    init_deck
    temp = @deck.dup
    (0...@grid.length).each do |i|
      (0...@grid.length).each do |j|
        pos = [i, j]
        self[pos]= temp.shuffle!.pop
      end
    end
  end

  def reveal(pos)
    self[pos].reveal
    render
  end

  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def []=(pos, val)
    row, col = pos
    @grid[row][col] = val
  end

  def won?
    @grid.flatten.all? { |card| card.state == true }
  end

  def render
    puts "\n~~~~~~~~~~~~~~~~~\n"
    (0...@grid.length).each do |x|
      (0...@grid.length).each do |y|
        pos = x, y
        print "X" unless self[pos].state
        print self[pos].face_value if self[pos].state
        print "\t"
      end
      print "\n"
    end
    puts "\n~~~~~~~~~~~~~~~~~\n"
  end

end
