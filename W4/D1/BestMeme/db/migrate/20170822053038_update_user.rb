class UpdateUser < ActiveRecord::Migration[5.1]
  def change
    remove_columns :users, :name, :email
    # add_column :users, :username, null: false
    # add_index :users, :username, unique: true
  end
end
