// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const PROD_WEBSITE_BASE_URL = 'https://www.navplan.ch/v2/';
const WEBSITE_BASE_URL = 'http://localhost/navplan2/';

export const environment = {
    production: false,
    mapOversizeFactor: 1.3,
    iconBaseUrl: './assets/icon/',
    airportServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Aerodrome/Aerodrome.php',
    airspaceServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/Airspace.php',
    navaidServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/Navaid.php',
    exporterBaseUrl: WEBSITE_BASE_URL + 'php/Navplan/Exporter/Exporter.php',
    exportBaseUrl: WEBSITE_BASE_URL + 'tmp/',
    flightrouteServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Flightroute/Flightroute.php',
    metarTafBaseUrl: 'https://www.aviationweather.gov/cgi-bin/json/MetarJSON.php?taf=true&density=all&bbox=',
    meteoDwdServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoDwd/MeteoDwd.php',
    meteoDwdMapTilesUrl: WEBSITE_BASE_URL + 'meteo_dwd/',
    cloudMeteogramServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoGram/Rest/Service/ReadCloudMeteogram.php',
    meteoSmaServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoSma/MeteoSma.php',
    notamRestServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Notam/Notam.php',
    openAipServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/Search.php',
    searchServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/Search.php',
    trackServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Track/Track.php',
    trafficAdsbexServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php?action=readadsbextraffic',
    trafficOgnServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php?action=readogntraffic',
    trafficDetailServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/Traffic.php',
    userServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/User/User.php',
    verticalMapServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/VerticalMap/VerticalMap.php',
    webcamServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Webcam/Webcam.php',
    chartBaseUrl: WEBSITE_BASE_URL + 'charts/',
    chart2BaseUrl: WEBSITE_BASE_URL + 'charts2/',
    mapTilesIcaoChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_aero/',
    mapTilesGliderChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_glider/',
};
