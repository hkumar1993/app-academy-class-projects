class Array
  def my_each(&prc)
    length = self.length
    n = 0
    final = []
    while n < length
      final[n] = prc.call(self[n])
      n += 1
    end
    final
  end

  def my_select(&prc)
    final = []

    self.my_each do |n|
      final << n if prc.call(n)
    end
    final
  end

  def my_reject(&prc)
    final = []
    self.my_each do |n|
      final << n unless prc.call(n)
    end
    final
  end

  def my_any?(&prc)
    self.my_each do |x|
      return true if prc.call(x)
    end
    false
  end

  def my_all?(&prc)
    result = true
    self.my_each do |x|
      result = result && prc.call(x)
    end
    result
  end

  def my_flatten
    final = []
    self.my_each do |x|
      if x.class == Array
        final.concat(x.my_flatten)
      else
        final << x
      end
    end
    final
  end

  def my_zip(*arrays)
    final = []
    self.each_with_index do |el, idx|
      arr = [el]
      arrays.each do |array|
        arr << array[idx]
      end
      final << arr
    end
    final
  end

  def my_rotate(times = 1)
    mod_time = times % self.length
    final = self.dup
    if mod_time < 0
      mod_time = self.length - mod_time.abs
    end
    (0...mod_time).each do |x|
      final.push(final.shift)
    end
    final
  end

  def my_join(del = "")
    final = ""
    self.my_each do |x|
      final = "#{final}#{del}#{x}"
    end
    final
  end
    
end
