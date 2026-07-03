# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# provider 'collider' streams are scraped from a per-service Collider "best movies on X" listicle (url).
# provider 'tmdb' streams are pulled from the TMDB API by looking up tmdb_provider_name via
# /watch/providers/movie and then querying /discover/movie for that provider (requires TMDB_API_KEY).
Stream.create(name: 'netflix', provider: 'collider', url: "https://collider.com/best-movies-on-netflix-streaming/")
Stream.create(name: 'hulu', provider: 'collider', url: "https://collider.com/best-shows-on-hulu-right-now/")
Stream.create(name: 'amazon', provider: 'collider', url: "https://collider.com/best-movies-on-amazon-prime/")
Stream.create(name: 'hbo', provider: 'collider', url: "https://collider.com/best-movies-on-hbo-max/")
Stream.create(name: 'disney', provider: 'collider', url: "https://collider.com/best-movies-on-disney-plus/")
Stream.create(name: 'apple', provider: 'collider', url: "https://collider.com/best-movies-on-apple-tv/")
Stream.create(name: 'showtime', provider: 'tmdb', tmdb_provider_name: 'Showtime')
Stream.create(name: 'starz', provider: 'tmdb', tmdb_provider_name: 'Starz')
Stream.create(name: 'cinimax', provider: 'tmdb', tmdb_provider_name: 'Cinemax')
Stream.create(name: 'dc', provider: 'tmdb', tmdb_provider_name: 'Max')
Stream.create(name: 'epix', provider: 'tmdb', tmdb_provider_name: 'MGM Plus')
Stream.create(name: 'cbs', provider: 'tmdb', tmdb_provider_name: 'Paramount Plus')
Stream.create(name: 'shudder', provider: 'tmdb', tmdb_provider_name: 'Shudder')
Stream.create(name: 'amc', provider: 'tmdb', tmdb_provider_name: 'AMC+')
