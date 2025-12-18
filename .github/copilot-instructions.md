# Copilot Instructions for Navplan2

Purpose: Give AI coding agents the minimum project-specific context to be productive here without guesswork.

## Big Picture
- Three services managed by Docker Compose: `navplan_persistence` (MariaDB), `navplan_backend` (PHP + Apache), `navplan_frontend` (Angular built and served by Nginx). See docker-compose for ports and volumes.
- Frontend calls REST endpoints exposed by Apache rewrite rules under `/api/...`, implemented in modular PHP domains (`Navplan/*`) wired via a DI container (`ProdNavplanDiContainer`).
- Data flows: Angular → `environment.*.ts` base URL → Apache `.htaccess` routes → PHP domain services → MariaDB + file-based resources (charts, terrain, meteo). Static assets (charts, forecast tiles) mounted as volumes.

## Dev Workflow
- Start everything:
  - Build + run: `docker-compose build` then `docker-compose up -d`.
  - Frontend served at `http://localhost:4200`, backend at `http://localhost:8080`, DB at host port `3307`, phpMyAdmin at `http://localhost:8081`.
- Meteo forecast assets: copy local `navplan_backend/meteo_forecast` into the backend volume using `navplan_backend/copy_meteo_forecast.bat` (PowerShell/Windows). Container must be running.
- Logs: backend logs go to Docker stdout (see `php-app/config/navplan_prod.ini`: `log_file = php://stdout`); view with `docker logs navplan_backend`. Charts and meteo directories are persisted via volumes.
- Angular local dev: You can also run `ng serve` inside `navplan_frontend/angular-app` and point to backend `http://localhost:8080/` (already configured in `environment.ts`).

## Project Conventions
- Frontend layering per feature: `domain/` (models, interfaces), `rest/` (DTOs + converters + repos), `state/` (NgRx reducers/effects/actions), `view/` (`ng-components` and `ol-components` for OpenLayers). Example: Navaid feature in `src/app/navaid/*`.
- HTTP calls always go through feature-specific `Rest*Repo` services implementing `I*RepoService`, using `HttpHelper.mergeParameters` and `*Converter` classes for request/response typing.
- Map rendering uses OpenLayers; interaction/state lives in NgRx; styles in dedicated `ol-*-style.ts` files.
- Backend is structured by domains under `php-app/src/Navplan/*`, each with its own `Prod*DiContainer`. Apache `.htaccess` in `php-app/api` maps REST paths to domain entrypoints.
- Configuration comes from `php-app/config/navplan_prod.ini` via `IniFileConfig`; DB creds are supplied by Docker secrets, not hardcoded.

## Integration Points
- DB: MariaDB initialized from `navplan_persistence/db_init_scripts/*.sql`; user `tschanz_navfpl` granted RW on schema. Container exposes `3307` on host.
- Charts: served from `/var/www/html/charts` volume; frontend uses `environment.chartBaseUrl`.
- Terrain tiles: `/var/www/html/terraintiles`; backend Dockerfile fetches a small Swiss sample set at build time.
- Meteo forecast tiles: `/var/www/html/meteo_forecast`; copy provided dataset into the container for local usage.

## Examples to follow
- Frontend REST repo: `navaid/rest/service/rest-navaid.service.ts` shows URL param assembly and converter usage.
- Backend routing: `php-app/api/.htaccess` maps `/api/navaids` → `Navplan/Navaid/Navaid.php` via `RestServiceBootstrap.php` and DI wiring in `ProdNavplanDiContainer`.
- State management: `app.module.ts` bootstraps NgRx store/effects; see feature reducers/effects under `src/app/*/state/ngrx/`.

## Gotchas
- Angular CLI version in root README is outdated; Dockerfile installs latest CLI and builds to `dist/browser/` (Nginx serves static). Prefer Docker for consistent builds.
- CORS origin selection is handled in `RestServiceBootstrap.php` based on `HTTP_HOST` (localhost vs prod). Keep backend on `http://localhost:8080` to avoid CORS issues.
- Secrets files (`secrets/db_root_pw.txt`, `secrets/db_navplan_pw.txt`) must exist; Docker uses them to provision DB.

## Common tasks
- Add a new REST endpoint: update Apache rewrite in `php-app/api/.htaccess`, implement domain service under `php-app/src/Navplan/<Feature>`, wire via `Prod*DiContainer`, and add frontend `Rest*Repo` + NgRx actions/effects.
- Wire a map overlay: create `view/ol-components/*` for styling/interaction, connect to feature state, fetch data via the feature `Rest*Repo` using `environment.*` URLs.
