require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_line = params.keys.map { |key| "#{key}=?" }
    where_line = where_line.join(' and ')
    values = params.values
    results = DBConnection.execute(<<-SQL, values)
      SELECT *
      FROM #{self.table_name}
      WHERE #{where_line}
    SQL
    self.parse_all(results)
  end
end

class SQLObject
  # Mixin Searchable here...
  extend Searchable

end
