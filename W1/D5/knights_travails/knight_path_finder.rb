require_relative "../tree_node/lib/00_tree_node"
require "byebug"

class KnightPathFinder

  attr_reader :tree, :root_node

  def initialize(pos)
    @root = pos
    @root_node = PolyTreeNode.new(@root)
    @visited_positions = [@root]
    build_move_tree
  end

  def build_move_tree
    queue = [@root_node]
    until queue.empty?
      current_node = queue.shift
      queue += move_positions(current_node)
    end
    nil
  end

  def move_positions(parent_node)
    pos = parent_node.value
    available_pos = []
    pos_diffs = [-2, -1, 1, 2]
    pos_diffs.each do |i|
      pos_diffs.each do |j|
        next if i.abs == j.abs
        temp_pos = [pos.first + i, pos.last + j]
        if valid_pos?(temp_pos)
          temp_node = PolyTreeNode.new(temp_pos)
          unless @visited_positions.include?(temp_pos)
            available_pos << temp_node
            temp_node.parent = parent_node
            @visited_positions << temp_pos
          end
        end
      end
    end
    available_pos
  end

  def valid_pos?(pos)
    x, y = pos
    return true if (0...8).include?(x) && (0...8).include?(y)
    false
  end

  def render_tree
    @tree.each_with_index do |node, idx|
      puts "Index : #{idx}"
      puts "Node : #{node.value}"
      puts "Parent : #{node.parent.value}" unless node.parent.nil?
      puts "Children : #{ node.children.map { |child| child.value} }"
      puts "~~~~~~~"
    end
    nil
  end

  def find_path(target_pos)
    target_node = @root_node.bfs(target_pos)
    path = trace_path(target_node)
    puts "#{path}"
    path
  end

  def trace_path(target_node)
    return [target_node.value] if target_node.parent.nil?
    trace_path(target_node.parent) << target_node.value
  end

end

if __FILE__ == $PROGRAM_NAME
  raise ArgumentError, "Please run program like : \n ruby knigth_path_finder.rb 0,0 3,4" if ARGV.length != 2
  start_pos = ARGV[0].split(",").map(&:to_i)
  end_pos = ARGV[1].split(",").map(&:to_i)
  kpf = KnightPathFinder.new(start_pos)
  kpf.find_path(end_pos)
end
