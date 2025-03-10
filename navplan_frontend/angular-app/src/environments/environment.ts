// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const PROD_WEBSITE_BASE_URL = 'https://www.navplan.ch/v2/';
const WEBSITE_BASE_URL = 'http://localhost:8080/';

export const environment = {
    production: false,
    mapOversizeFactor: 1.3,
    iconBaseUrl: './assets/icon/',
    aircraftApiBaseUrl: WEBSITE_BASE_URL + 'api/aircrafts',
    aircraftTypeDesignatorApiBaseUrl: WEBSITE_BASE_URL + 'api/aircrafts/typedesignators',
    airportApiBaseUrl: WEBSITE_BASE_URL + 'api/aerodromes',
    airportChartApiBaseUrl: WEBSITE_BASE_URL + 'api/aerodromes/charts',
    airportCircuitApiBaseUrl: WEBSITE_BASE_URL + 'api/aerodromes/circuits',
    airportReportingPointApiBaseUrl: WEBSITE_BASE_URL + 'api/aerodromes/reportingpoints',
    airspaceApiBaseUrl: WEBSITE_BASE_URL + 'api/airspaces',
    navaidApiBaseUrl: WEBSITE_BASE_URL + 'api/navaids',
    exporterBaseUrl: WEBSITE_BASE_URL + 'php/Navplan/Exporter/Exporter.php',
    exportBaseUrl: WEBSITE_BASE_URL + 'tmp/',
    flightrouteApiBaseUrl: WEBSITE_BASE_URL + 'api/flightroutes',
    metarTafBaseUrl: 'https://www.aviationweather.gov/cgi-bin/json/MetarJSON.php?taf=true&density=all&bbox=',
    meteoDwdServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoDwd/MeteoDwd.php',
    meteoDwdMapTilesUrl: WEBSITE_BASE_URL + 'meteo_dwd/',
    meteogramApiBaseUrl: WEBSITE_BASE_URL + 'api/meteograms',
    meteoSmaApiBaseUrl: WEBSITE_BASE_URL + 'api/meteosma',
    notamRestApiBaseUrl: WEBSITE_BASE_URL + 'api/notams',
    searchTextApiBaseUrl: WEBSITE_BASE_URL + 'api/search/text',
    searchPositionApiBaseUrl: WEBSITE_BASE_URL + 'api/search/position',
    trackServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Track/Track.php',
    trafficAdsbexServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php?action=readadsbextraffic',
    trafficOgnServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php?action=readogntraffic',
    trafficDetailServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php',
    userServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/User/User.php',
    verticalMapServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/VerticalMap/VerticalMap.php',
    webcamApiBaseUrl: WEBSITE_BASE_URL + 'api/webcams',
    chartBaseUrl: WEBSITE_BASE_URL + 'charts2/',
    mapTilesIcaoChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_aero/',
    mapTilesGliderChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_glider/',
};
