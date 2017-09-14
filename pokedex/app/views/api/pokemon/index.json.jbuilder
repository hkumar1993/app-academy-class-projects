@pokemon.each do |pokemon|
  json.set! pokemon.id do
    json.extract! pokemon, :id, :name
    json.image_url image_path(pokemon.image_url)
    # json.image_url asset_path("pokemon_snaps/#{pokemon.image_url}")
  end
end
