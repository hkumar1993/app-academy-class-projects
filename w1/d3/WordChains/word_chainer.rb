require 'set'

class WordChainer

  attr_reader :dictionary

  def initialize(dictionary_file_name = 'dictionary.txt')
    puts "Initializing Dictionary ..."
    @dictionary = File.readlines(dictionary_file_name).map(&:chomp)
    @dictionary = Set.new(@dictionary)
  end

  def adjacent_words(word)
    # result = @dictionary.dup
    @dictionary.select { |dict_w| differ_by_one?(word, dict_w) }
  end

  def differ_by_one?(word1, word2)
    return false if word1.length != word2.length
    return false if word1 == word2
    length = word1.length
    one_diff = 1
    (0...length).each do |idx|
      if word1[idx] != word2[idx]
        if one_diff == 1
          one_diff = 0
        else
          return false
        end
      end
    end
    true
  end

  def run(source, target)
    @current_words = [source]
    @all_seen_words = { source => nil }
    print "Checking combinations ."
    until @current_words.empty? || @all_seen_words.keys.include?(target)
      explore_current_word
      print "\nStill checking."
    end
    print "\nFOUND\n"
    p build_path(target).reverse
  end

  def explore_current_word
    new_current_words = []
    @current_words.each do |current_word|
      print "."
      adjacent_words(current_word).each do |adjacent_word|
        unless @all_seen_words.keys.include?(adjacent_word)
          @all_seen_words[adjacent_word] = current_word
          new_current_words << adjacent_word
          # puts "New Word: #{adjacent_word} => Source: #{current_word}"
        end
      end
    end
    @current_words = new_current_words
  end

  def build_path(target)
    return [target] if @all_seen_words[target].nil?
    path = [target]
    path + build_path(@all_seen_words[target])
  end

end

if __FILE__ == $PROGRAM_NAME
  WordChainer.new.run(ARGV[0],ARGV[1])
end
