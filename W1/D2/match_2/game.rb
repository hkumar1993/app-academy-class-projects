require_relative 'player.rb'
require_relative 'board.rb'


class Game

  attr_accessor :board, :prev_guess, :player, :guess

  def initialize(player = "no_name", board = nil)
    @board = board || Board.new
    @player = player
    @guess = nil
    @prev_guess = nil
  end

  def play
    until @board.won?
      # system("clear")
      @board.render
      2.times { player_turn }
      puts "press enter to continue"
      # gets
    end
  end

  def player_turn
    @guess = @player.get_input(board.grid.length)
    puts "Memory is #{@player.memory}"
    puts "Pool us #{@player.pool}"
    puts "Guess is : #{@guess}"
    until valid_guess?
      # byebug
      puts "Position Invalid, try again"

      puts "Guess is : #{@guess}"
      @guess = @player.get_input(board.grid.length)
    end
    make_guess
    handle_input
  end

  def handle_input
    if @prev_guess.nil?
      @prev_guess = @guess.dup
    else
      compare_guesses
    end
  end


  def make_guess
    @board.reveal(@guess)
  end

  def valid_guess?
    row,col = @guess
    return false if row >= @board.grid.length || col >= @board.grid.length
    return false if @board[@guess].state
    true
  end

  def compare_guesses
    unless @board[@guess] == @board[@prev_guess]
      @board[@guess].hide
      @board[@prev_guess].hide
    end
    @player.process_result(@guess, @prev_guess, @board)
    @guess = nil
    @prev_guess = nil
  end

end


Game.new(ComputerPlayer.new).play
