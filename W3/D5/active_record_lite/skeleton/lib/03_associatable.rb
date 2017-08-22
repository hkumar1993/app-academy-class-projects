require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    eval(@class_name)
  end

  def table_name
    model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    default = {
      foreign_key: (name.to_s + "_id").to_sym,
      primary_key: :id,
      class_name: name.to_s.camelcase
    }
    default = default.merge(options)
    @foreign_key = default[:foreign_key]
    @class_name = default[:class_name]
    @primary_key = default[:primary_key]
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})

    default = {
      foreign_key: (self_class_name.to_s.underscore + "_id").to_sym,
      primary_key: :id,
      class_name: name.to_s.camelcase.singularize
    }
    default = default.merge(options)
    @foreign_key = default[:foreign_key]
    @class_name = default[:class_name]
    @primary_key = default[:primary_key]
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    # assoc_options
    options = BelongsToOptions.new(name, options)
    define_method(name) do
      key_val = self.send(options.foreign_key)
      options.model_class
        .where(options.primary_key => key_val)
        .first
    end
    assoc_options[name] = options
  end

  def has_many(name, options = {})
    options = HasManyOptions.new(name, self.name, options)
    define_method(name) do
      key_val = self.send(options.primary_key)
      options.model_class
        .where(options.foreign_key => key_val)
    end
  end

  def assoc_options
    @assoc_options ||= {}
  end
end

class SQLObject
  # Mixin Associatable here...
  extend Associatable

end
