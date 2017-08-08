require 'byebug'

class HumanPlayer

  attr_reader :name, :guess

  def initialize(name = nil)
    puts "Enter Name" if name.nil?
    name ||= gets.chomp
    @name = name
    @guess = nil
  end

  def get_input(grid_length)
    prompt
    @guess = gets.chomp
    @guess = convert_input
    @guess
  end

  def prompt
    puts "#{@player} : Please input a position"
  end

  def convert_input
    @guess.split(',').map(&:to_i)
  end

  def process_result(cur_guess, prev_guess, board)
    if board[cur_guess] == board[prev_guess]
      puts "Pair Matched"
    else
      puts "Pair did no match"
    end
  end

end

class ComputerPlayer

  attr_reader :name, :pool, :memory

  def initialize
    @name = "AI"
    @memory = Hash.new { |h, k| h[k]= [] }
    @next_guess = nil
    @pool = []
  end

  def generate_pool(grid_length)
    @pool = [*0...grid_length].product([*0...grid_length])
  end

  def get_input(grid_length)
    generate_pool(grid_length) if @pool.empty?
    unless @next_guess.nil?
      temp = @next_guess.dup
      @next_guess = nil
      # byebug
      print temp
    end

    if @memory.any? { |k,v| v.length == 2 }
      selected = @memory.select {|k,v| v.length == 2}
      selected_key = selected.keys[0]
      @next_guess = selected.values[0][0]
      return_guess = selected.values[0][1]
      @memory.delete(selected_key)
      # byebug
      print return_guess
    else
      # byebug
      print @pool.shuffle!.pop
    end
  end

  def process_result(cur_guess, prev_guess, board)
    cur_card_val = board[cur_guess].face_value
    prev_card_val = board[prev_guess].face_value
    set_memory(cur_card_val, cur_guess)
    set_memory(prev_card_val, prev_guess)
  end

  def set_memory(val, pos)
    @memory[val] << pos unless @memory[val].include?(pos)
  end

end
