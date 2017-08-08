require_relative 'player.rb'
require 'byebug'

class Game

  attr_reader :players, :dictionary, :fragment, :current_player, :previous_player, :losses

  def initialize(*players)
    raise ArgumentError, "not enough players" if players.length < 2
    @losses = Hash.new(0)
    @dictionary = File.readlines('dictionary.txt').map!(&:chop)
    @players = players
    @current_player = @players.first
    @previous_player = @players.last
    @fragment = ""
  end

  def record(player)
    @losses[player] += 1
  end

  def play_round
    until victory?
      take_turn(@current_player)
      puts "\n~~~~~~~~\nCurrent Fragment : #{@fragment} \n~~~~~~~~~~~~\n"
    end
    puts "#{@current_player.name} Wins - Word : #{@fragment}"
    record(@previous_player)
    @players.pop
    @players.each { |player| player.read_dictionary }
    @fragment = ""
  end

  def next_player!
    @current_player = @players.rotate!.first
    @previous_player = @players.last
  end

  def take_turn(player)

    puts "Current fragment : #{@fragment}"
    guess = player.guess(@players.length, @fragment)

    if valid_play?(guess)
      @fragment.concat(guess)
      next_player!
    else
      player.alert_invalid_guess
      take_turn(player)
    end

  end

  def valid_play?(string)
    puts "Guess was : #{string}"
    return false if string.length > 1
    test_string = "#{@fragment}#{string}"
    @dictionary.any? { |word| word[0...test_string.length] == test_string }
  end

  def victory?
    @dictionary.include?(@fragment)
  end

  def run
    until @players.length == 1
      play_round
      puts "\n---------\nNumber of losses"
      @losses.each do |k,v|
        puts "#{k.name}: #{v}"
      end
      puts "\n---------\n"
    end

    puts "Winner is #{@players.first.name}"
  end

end
