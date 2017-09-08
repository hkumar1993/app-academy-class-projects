require 'byebug'

class HumanPlayer
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def guess(num_players, fragment)
    puts "Please enter character, #{@name}"
    input = gets.chomp
    input
  end

  def alert_invalid_guess
    puts "Invalid entry for last guess"
  end

  def read_dictionary
    #To make game versatile between AI and Humans
  end
end

class AIPlayer
  attr_accessor :name

  attr_reader :dictionary

  def initialize(name)
    @name = name
    read_dictionary
  end

  def guess(num_players, fragment)
    puts "Computer #{@name} is guessing"

    @dictionary.select! { |word| word[0...fragment.length] == fragment }
    last_guess = @dictionary.shuffle.first[fragment.length]

    @dictionary.reject! { |word| best_selection(num_players, fragment, word) }
    last_guess = @dictionary.shuffle.first[fragment.length] unless @dictionary.empty?

    @dictionary.reject! { |word| word.length == fragment.length + 1 }
    last_guess = @dictionary.shuffle.first[fragment.length] unless @dictionary.empty?

    last_guess
  end

  def read_dictionary
    @dictionary = File.readlines('dictionary.txt').map!(&:chop)
  end

  def valid_play?(string,fragment)
    test_string = "#{fragment}#{string}"
    @dictionary.any? { |word| word[0...test_string.length] == test_string }
  end

  def random_char
    ("a".."z").to_a.shuffle.first
  end

  def best_selection(num_players, fragment, word)
    (word.length - fragment.length + 1) % num_players < 0
  end

  def alert_invalid_guess
    puts "Invalid entry for last guess"
  end
end
