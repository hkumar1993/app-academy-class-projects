class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :album_image_url
      t.string :year, null: false
      t.integer :band_id, null: false
      t.timestamps
    end
    add_index :albums, :band_id
    add_index :albums, :title
    add_index :albums, :year
  end
end
