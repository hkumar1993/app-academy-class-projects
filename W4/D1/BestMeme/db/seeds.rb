# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times {User.create(username: Faker::Internet.unique.user_name)}
5.times { Artwork.create(
  title: Faker::Hacker.unique.adjective,
  image_url: Faker::Avatar.unique.image,
  artist_id: rand(10) + 1
  )}
10.times { ArtworkShare.create(
  artwork_id: rand(5) + 1,
  viewer_id: rand(10) + 1
  )}
