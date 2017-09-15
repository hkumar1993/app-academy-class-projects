def factors(num)
  (1..num).select { |x| num % x == 0 }
end


class Array
  def bubble_sort!(&prc)
    searching = true
    while searching
      searching = false
      (0...self.length - 1).each do |idx|
        bubble = 0
        if prc.nil?
          bubble = 1 if self[idx] > self[idx + 1]
        else
          bubble = prc.call(self[idx], self[idx + 1])
        end
        if bubble == 1
          self[idx], self[idx + 1] = self[idx + 1], self[idx]
          searching = true
        end
      end
    end
  end

  def bubble_sort(&prc)
    dup = self.dup
    dup.bubble_sort!(&prc)
    dup
  end


end

def subwords(string, dictionary)
  dictionary.select { |word| string.include?(word) }
end

def substrings(string)
  final = []

  (0...string.length).each do |x|
    (x...string.length).each do |y|
      final << string[x..y]
    end
  end
  final
end
