class CreateBands < ActiveRecord::Migration[5.1]
  def change
    create_table :bands do |t|
      t.string :name, null: false
      t.string :band_image_url
      t.timestamps
    end
    add_index :bands, :name, unique: true
  end
end
