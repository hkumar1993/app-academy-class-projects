class TowersOfHanoi

  attr_reader :board

  def initialize
    @board = [[1,2,3],[],[]]
  end

  def move(start_pos, end_pos)
    raise "you aren't moving any piece" if end_pos == start_pos
    raise "start position empty" if @board[start_pos].empty?
    raise "end piece too small" if @board[end_pos].first.to_i <
      @board[start_pos].first.to_i && !@board[end_pos].empty?
    @board[end_pos].unshift(@board[start_pos].shift)
  end

  def won?
    return true if @board[1] == [1,2,3]
    return true if @board[2] == [1,2,3]
    false
  end

end
