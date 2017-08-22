require_relative 'db_connection'
require 'active_support/inflector'
require 'byebug'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject

  def self.columns
    return @columns if @columns
    rows = DBConnection.execute2(<<-SQL)
      SELECT *
      FROM #{self.table_name}
    SQL
    @columns = rows[0].map(&:to_sym)
  end

  def self.finalize!
    self.columns
    @columns.each do |method_symbol|
      method_name = method_symbol.to_s
      define_method(method_name) do
        self.attributes[method_symbol]
      end

      define_method("#{method_name}=") do |arg|
        self.attributes[method_symbol] = arg
      end

    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= self.to_s.tableize
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      select *
      from #{self.table_name}
    SQL
    self.parse_all(results)
  end

  def self.parse_all(results)
    # byebug
    results.map do |row|
      results_hash = {}
      # row = row.reject {|k,v| k=="id"}
      row.each do |k,v|
        results_hash[k.to_sym] = v
      end
      row = self.new(results_hash)
    end
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL)
      SELECT *
      FROM #{self.table_name} as data
      WHERE data.id = #{id}
    SQL
    self.parse_all(results).first
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      attr_names = self.class.columns
      raise "unknown attribute \'#{attr_name}\'" unless attr_names.include?(attr_name)
      self.send("#{attr_name.to_sym}=", value)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    @attributes.values
  end

  def insert
    DBConnection.execute(<<-SQL, attribute_values)
      insert into #{self.class.table_name} (#{@attributes.keys.join(',')})
      values (#{(["?"] * @attributes.length).join(',')})
    SQL
    self.id = DBConnection.last_insert_row_id
  end

  def update
    DBConnection.execute(<<-SQL, attribute_values)
      update #{self.class.table_name}
      set #{(self.class.columns.map { |name| name.to_s + "=?"}).join(',')}
      where id = #{self.id}
    SQL
  end

  def save
    insert unless id
    update if id
  end
end
