class CreateGoals < ActiveRecord::Migration[5.1]
  def change
    create_table :goals do |t|
      t.string :title
      t.text :description
      t.boolean :private
      t.boolean :status
      t.integer :user_id
      t.timestamps
    end
    add_index :goals, :user_id
  end
end
