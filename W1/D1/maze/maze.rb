class Maze

  def initialize(filename = 'maze.rb')
    @maze = File.readlines(filename).map(&:chop).map
  end

end
