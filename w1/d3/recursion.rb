require 'byebug'

def range_recursive(start_num, end_num)
  return [] if end_num <= start_num
  array = [start_num]
  array + range(start_num + 1, end_num)
end

def range_iterative(start_num, end_num)
  array = []
  (start_num...end_num).each do |num|
    array << num
  end
  array
end

def sum_recursive(array)
  return 0 if array.empty?
  array.first + sum_recursive(array[1..-1])
end

def sum_iterative(array)
  result = 0
  array.each do |num|
    result += num
  end
  result
end

def exp_1(base, exp)
  return 1 if exp == 0
  base * exp_1(base, exp - 1)
end

def exp_2(base, exp)
  return 1 if exp == 0
  return base if exp == 1
  return exp_2(base, exp / 2)**2 if exp.even?
  base * (exp_2(base, (exp - 1) / 2)**2)
end

class Array
  def deep_dup
    return [] if self.empty?
    new_array = []
    if self.first.is_a? Array
      new_array += [self.first.deep_dup]
    else
      new_array += [self.first]
    end
    new_array += self[1..-1].deep_dup
  end
end

def fibonacci(n)
  return [] if n < 1
  return [1] if n == 1
  prev_fib = fibonacci(n - 1)

  prev_fib + [prev_fib[-1] + prev_fib[-2].to_i]
end

def fibonacci_iterative(n)
  new_array = []
  (0...n).each do |idx|
    new_array << 1 if idx <= 1
    new_array << new_array[idx - 1] + new_array[idx - 2] if idx > 1
  end
  new_array
end

def subset(array)
  return [[]] if array.empty?
  prev_set = subset(array[0...-1])
  prev_set + prev_set.map do |el|
    el + [array.last]
  end
end

def permutations(array)
  return array if array.length == 1
  result = []
  array.each_index do |idx|
    permutations(array[0...idx] + array[idx + 1..-1]).each do |permuted_array|
      result << ([array[idx]] + [permuted_array]).flatten
    end
  end
  result
end

def b_search(array, num)
  return nil if num > array.max || num < array.min || array.empty?
  mid_index = array.length / 2
  mid_el = array[mid_index]
  return mid_index if mid_el == num

  if num < mid_el
    search_index = b_search(array[0...mid_index], num)
    final_index = search_index
  else
    search_index = b_search(array[mid_index..-1], num)
    final_index = mid_index + search_index
  end
  final_index
end

class Array
  def merge_sort
    return self if self.length <= 1
    mid_index = self.length / 2
    left_array = self[0...mid_index].merge_sort
    right_array = self[mid_index..-1].merge_sort
    left_array.merge(right_array)
  end

  def merge(arr)
    result = []
    i = 0
    j = 0
    until i == self.length && j == arr.length
      if j == arr.length || (i != self.length && self[i] < arr[j])
        result << self[i]
        i += 1
      else
        result << arr[j]
        j += 1
      end
    end
    result
  end
end



def greedy_make_change(amount, coins = [25, 10, 5, 1]) #[10,7,1]
  return [] if amount == 0
  return [amount] if coins.include? amount
  result = []
  biggest_coin = coins.select { |coin| coin < amount }.max
  ((amount / biggest_coin)).times { result << biggest_coin }
  result + greedy_make_change(amount - result.reduce(:+), coins[1..-1])
end

def make_better_change(amount, coins = [25, 10, 5, 1]) #[10,7,1]
  return [] if amount == 0
  return [amount] if coins.include? amount
  possible_coins = coins.select { |coin| amount > coin }
  biggest_coin = possible_coins.max
  second_coin = possible_coins[1]
  unless second_coin.nil?
    if amount % biggest_coin <= amount % second_coin
      chosen_coin = biggest_coin
    else
      chosen_coin = second_coin
    end
  else
    chosen_coin = biggest_coin
  end
  result = [chosen_coin] + make_better_change(amount - chosen_coin, possible_coins)
  result.sort.reverse

end
