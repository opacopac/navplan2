# Copilot Instructions for Navplan2

Purpose: Give AI coding agents the minimum project-specific context to be productive here without guesswork.

## Business Context
Navplan2 is a web-based flight planning application for VFR pilots in Switzerland, providing map-based route planning, weather, notams, aircraft w&b, aircraft performance, etc. The app serves recreational pilots, aiming to simplify pre-flight planning in the browser on a map with integrated charts, terrain data, and meteorological information, etc.

## Architecture Overview
- The application consists of three parts managed by Docker Compose: `navplan_persistence` (MariaDB), `navplan_backend` (PHP + Apache), `navplan_frontend` (Angular built and served by Nginx). See docker-compose for ports and volumes.
- Frontend calls REST endpoints exposed by Apache rewrite rules under `/api/...`, implemented in modular PHP domains (`Navplan/*`) wired via a DI container (`ProdNavplanDiContainer`).
- Each of the parts is primarily structured by business dommains, e.g.: Navaids, Airspaces, Airports, Routes, Flight Plans, Aircraft, Performance, Charts, Terrain, Meteo, etc.
- Each domain is structured into subfolders, depending on the required layers (e.g. backend: domain model, API entrypoint, service, repo; frontend: domain model, view, state, rest).
- Data flows: Angular → `environment.*.ts` base URL → Apache `.htaccess` routes → PHP domain services → MariaDB + file-based resources (charts, terrain, meteo). Static assets (charts, forecast tiles) mounted as volumes.

## Dev Workflow
- Start everything:
  - Build + run: `docker-compose build` then `docker-compose up -d`.
  - Frontend served at `http://localhost:4200`, backend at `http://localhost:8080`, DB at host port `3307`, phpMyAdmin at `http://localhost:8081`.
- Meteo forecast assets: copy local `navplan_backend/meteo_forecast` into the backend volume using `navplan_backend/copy_meteo_forecast.bat` (PowerShell/Windows). Container must be running.
- Logs: backend logs go to Docker stdout (see `php-app/config/navplan_prod.ini`: `log_file = php://stdout`); view with `docker logs navplan_backend`. Charts and meteo directories are persisted via volumes.
- Angular local dev: You can also run `ng serve` inside `navplan_frontend/angular-app` and point to backend `http://localhost:8080/` (already configured in `environment.ts`).

## Project Conventions
- Frontend layering per feature: `domain/` (models, interfaces), `rest/` (DTOs + converters + repos), `state/` (NgRx reducers/effects/actions), `view/` (`ng-components` for angular components and `ol-components` for OpenLayers). Example: Navaid feature in `src/app/navaid/*`.
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

## Workflow requirements for AI coding assistants
- before every commit:
  - update these instructions when you notice missing context or useful information for AI coding assistants
  - use the "AI Longterm Braindump" section below to collect any relevant information to be persisted outside of the current context window and help the AI coding assistant in future tasks.

## AI Longterm Braindump
- Backend DI: hybrid PHP-DI approach. Each domain keeps an explicit `I<Feature>DiContainer` interface (module boundary). Migrated modules (`Config`, `System`, `Persistence`, `Webcam`, `Navaid`, `Admin`, `Aerodrome`, `AerodromeChart`, `AerodromeCircuit`, `AerodromeReporting`, `Aircraft`, `Airspace`, `Exporter`, `Flightroute`, `Geoname`, `MetarTaf`, `MeteoForecast`, `MeteoGram`, `MeteoRadar`, `MeteoSma`, `Notam`, `OpenAip`, `Search`, `Terrain`, `Track`, `Traffic`) no longer have a `Prod<Feature>DiContainer` class; instead they ship a `<feature>.definitions.php` file, and `ProdNavplanDiContainer` loads ALL definitions files into ONE application-wide container and implements the migrated interfaces directly (one-line delegate methods). Not-yet-migrated modules (`User`, `VerticalMap`) keep their old `Prod<Feature>DiContainer` class, wired via factory closures in `ProdNavplanDiContainer` - both styles coexist in the same container. Key gotchas: (1) every module binds its controller to the shared `IRestController` interface - migrated modules must bind the CONCRETE controller class instead to avoid collisions once merged into one container; (2) migrated `I<Feature>DiContainer` interfaces are self-registered as `$this` in the container so old factory closures (`$c->get(ISystemDiContainer::class)->getX()`) keep working, safe as long as delegate methods target a DIFFERENT container key (no recursion); (3) not every interface is worth flattening onto `ProdNavplanDiContainer` - `IConfigDiContainer` (extends ~10 narrow config interfaces, ~13 getters) stays un-flattened, `getConfigDiContainer()` just returns the real `ProdConfigDiContainer` instance from the container; narrow config interfaces owned by OTHER (still to be flattened) modules, e.g. `IMeteoForecastConfig`/`IMeteoRadarImagesConfig`/`IOpenAipConfig`/`ITerrainConfig`/`IAdsbexConfig`, get aliased in `config.definitions.php` via `get(IConfigDiContainer::class)` so their module's classes can autowire the narrow interface directly - but only if actually still consumed somewhere (e.g. `INotamConfig` was dropped entirely during the Notam migration since nothing type-hints it anymore); (4) temporary "bridge" definitions (`IUserService`, `ISearchUserPointUc`) let migrated modules autowire a dependency owned by a NOT-yet-migrated module - delete the bridge once that module is migrated too (e.g. the `IOpenAipImporter` bridge was deleted when `OpenAip` itself got migrated, and the `ITerrainService` bridge (used by `Geoname`/`CloudMeteoGram`/`VerticalMap`) was deleted when `Terrain` itself got migrated - keeping it would have caused infinite recursion, since the bridge closure and the module's own definitions file would both bind the same key; conversely, migrating `Search` required ADDING a new bridge for `ISearchUserPointUc` since `SearchService` autowires that not-yet-migrated `User` interface directly); (5) after each migration, grep production code for actual facade-getter usage and remove unused ones from both the interface and `ProdNavplanDiContainer` (underlying `*.definitions.php` bindings stay ONLY if still needed for internal autowiring, e.g. a controller/service autowiring a repo/query that has no external facade getter; if NOTHING type-hints an interface anymore - e.g. because the consumer depends on the CONCRETE class instead, like `NotamGeometryParser` does for `NotamCoordinateParser` - drop the binding entirely too; the `Terrain`/`Track`/`Traffic` migration removed `getTrackService()`, `getAdsbexConfig()`, `getAdsbexRepo()`, `getOgnRepo()`, `getTrafficDetailRepo()`, `getReadAdsbexTrafficUc()`, `getReadAdsbexTrafficWithDetailsUc()`, `getReadOgnTrafficUc()`, `getReadTrafficDetailsUc()` this way - only `getTerrainService()`, `getTrackController()`, `getTrafficController()`, `getOgnListenerRepo()` survived since something outside the container actually calls them); (6) when editing `ProdNavplanDiContainer.php` with multiple `replace_string_in_file` calls, NEVER batch them in parallel in one message - apply them one at a time and re-read/verify in between, since parallel edits to the same file can silently drop or duplicate changes; (7) also delete the now-orphaned `tests/unit/NavplanTest/<Feature>/Prod<Feature>DiContainerTest.php` for each migrated module - these tested the private-Container wiring of the removed `Prod<Feature>DiContainer` class and have no replacement (the merged container isn't unit-tested per module); (8) you can't easily smoke-test `ProdNavplanDiContainer` standalone outside Docker: `src/Autoloader.php` expects vendor at `src/vendor/autoload.php` (Docker layout) and `ProdConfigDiContainer::CONFIG_FILE` resolves relative to `src/Navplan/Config/../../config/...` which only works when the deployed layout differs from the raw checkout - both are pre-existing, unrelated quirks, not something to "fix" during a DI migration. See `navplan_backend/php-app/docs/di-approach.md` for full rationale, migration status, and the mechanical recipe to migrate remaining modules.

