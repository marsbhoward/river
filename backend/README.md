# River API

Rails API backend. See the top-level repo for the React frontend under `../frontend`.

## Ruby version

3.3.11 (see `Gemfile`)

## Deploying to Heroku

This app lives in `backend/` inside a monorepo (frontend is a sibling
directory). Heroku's buildpacks look for a `Gemfile` at the **repo root** by
default, so a plain deploy of this repo won't detect a Ruby app at all.

One-time setup on the Heroku app:

```bash
heroku buildpacks:clear -a <app-name>
heroku buildpacks:add -a <app-name> -i 1 https://github.com/lstoll/heroku-buildpack-monorepo
heroku buildpacks:add -a <app-name> -i 2 heroku/ruby
heroku config:set -a <app-name> APP_BASE=backend
```

The monorepo buildpack copies the contents of `backend/` up to the build
root before the Ruby buildpack runs, so `Gemfile`, `Procfile`, etc. are found
normally. This works with Heroku's GitHub auto-deploy (watching this repo's
`master` branch) - no per-deploy manual steps needed.

Also make sure the stack is current and the master key is set:

```bash
heroku stack:set heroku-24 -a <app-name>
heroku config:set RAILS_MASTER_KEY=<value from config/master.key> -a <app-name>
```

If instead you're deploying via `git push heroku master` directly (no
GitHub integration), `git subtree push --prefix backend heroku master` is
an alternative to the monorepo buildpack, but it needs to be re-run for
every deploy rather than happening automatically.
