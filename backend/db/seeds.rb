# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Stream.create(name: 'netflix', url: "http://collider.com/best-movies-on-netflix-streaming/")
Stream.create(name: 'hulu', url: "http://collider.com/best-movies-on-hulu-streaming")
Stream.create(name: 'amazon', url: "https://collider.com/best-movies-on-amazon-prime/")
Stream.create(name: 'hbo', url: "https://collider.com/best-movies-on-hbo/")
Stream.create(name: 'disney', url: "https://collider.com/best-movies-on-disney-plus/")
Stream.create(name: 'showtime', url: "https://collider.com/best-movies-on-showtime/")
Stream.create(name: 'starz', url: "https://reelgood.com/movies/source/starz?filter-sort=1")
Stream.create(name: 'cinimax', url: "https://reelgood.com/movies/source/cinemax?filter-sort=1")