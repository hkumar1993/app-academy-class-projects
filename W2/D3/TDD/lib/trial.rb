require 'byebug'

class Array
  def my_uniq
    temp_hash = Hash.new(0)
    self.each do |el|
      temp_hash[el] += 1
    end

    temp_hash.keys
  end

  def two_sum
    result = []
    (0...self.length - 1).each do |i|
      (i + 1...self.length).each do |j|
        result << [i, j] if self[i] + self[j] == 0
      end
    end
    result
  end

  def my_transpose
    result = []
    self.each_with_index do |row, id1|
      result << []
      row.each_with_index do |col, id2|
        result[id1] << self[id2][id1]
      end
    end
    result
  end

  def stock_picker
    return nil if self.empty?
    profit = 0
    days = []
    self.each_with_index do |stock, i|
      next if i == self.length - 1
      idx = i + 1
      while idx < self.length
        day_profit = self[idx] - self[i]
        if day_profit > profit
          profit = day_profit
          days = [i,idx]
        end
        idx += 1
      end
    end
    raise "DANGER : Don't Buy" if profit == 0
    days
  end

end
