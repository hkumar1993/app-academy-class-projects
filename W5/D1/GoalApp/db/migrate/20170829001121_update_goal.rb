class UpdateGoal < ActiveRecord::Migration[5.1]
  def change
    rename_column :goals, :private, :privacy_status
    rename_column :goals, :status, :completion_status
  end
end
