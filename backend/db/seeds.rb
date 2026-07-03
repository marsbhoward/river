# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# A stream can have either or both sources configured. The scraper gathers movies from
# whichever of url (Collider listicle) / tmdb_provider_name (TMDB discover API) are present,
# and weights each movie by how many sources agreed on it (see app/models/scraper.rb).
#
# dc has no Collider page distinct from hbo (both map to the real-world HBO Max service) and
# amc has no matching Collider listicle at all, so those two are TMDB-only.
Stream.create(name: 'netflix', url: "https://collider.com/best-movies-on-netflix-streaming/", tmdb_provider_name: 'Netflix')
Stream.create(name: 'hulu', url: "https://collider.com/best-shows-on-hulu-right-now/", tmdb_provider_name: 'Hulu')
Stream.create(name: 'amazon', url: "https://collider.com/best-movies-on-amazon-prime/", tmdb_provider_name: 'Amazon Prime Video')
Stream.create(name: 'hbo', url: "https://collider.com/best-movies-on-hbo-max/", tmdb_provider_name: 'HBO Max')
Stream.create(name: 'disney', url: "https://collider.com/best-movies-on-disney-plus/", tmdb_provider_name: 'Disney Plus')
Stream.create(name: 'apple', url: "https://collider.com/best-movies-on-apple-tv/", tmdb_provider_name: 'Apple TV')
Stream.create(name: 'starz', url: "https://collider.com/best-movies-on-starz-right-now/", tmdb_provider_name: 'Starz')
Stream.create(name: 'dc', tmdb_provider_name: 'HBO Max')
Stream.create(name: 'epix', url: "https://collider.com/best-movies-mgm-plus/", tmdb_provider_name: 'MGM Plus')
Stream.create(name: 'cbs', url: "https://collider.com/best-movies-on-paramount-plus/", tmdb_provider_name: 'Paramount Plus Essential')
Stream.create(name: 'shudder', url: "https://collider.com/best-movies-on-shudder/", tmdb_provider_name: 'Shudder')
Stream.create(name: 'amc', tmdb_provider_name: 'AMC+')
