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
    airportServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Aerodrome/AirportService.php',
    airspaceServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/AirspaceService.php',
    navaidServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/NavaidService.php',
    flightrouteServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Flightroute/FlightrouteService.php',
    meteoDwdServiceUrl: PROD_WEBSITE_BASE_URL + 'php/Navplan/MeteoDwd/RestService/MeteoDwdService.php',
    meteoDwdMapTilesUrl: PROD_WEBSITE_BASE_URL + 'meteo_dwd/',
    meteoSmaServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoSma/MeteoSmaService.php',
    notamRestServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Notam/NotamService.php',
    openAipServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/SearchService.php',
    searchServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/SearchService.php',
    trackServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Track/TrackService.php',
    trafficAdsbexServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/TrafficService.php?action=readadsbextraffic',
    trafficOgnServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/TrafficService.php?action=readogntraffic',
    trafficDetailServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/TrafficService.php',
    userServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/User/UserService.php',
    verticalMapServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/VerticalMap/VerticalMapService.php',
    webcamServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Webcam/WebcamService.php',
    exporterBaseUrl: WEBSITE_BASE_URL + 'php/Navplan/Exporter/ExporterService.php',
    exportBaseUrl: WEBSITE_BASE_URL + 'tmp/',
    chartBaseUrl: WEBSITE_BASE_URL + 'charts/',
    chart2BaseUrl: WEBSITE_BASE_URL + 'charts2/',
    mapTilesIcaoChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_aero/',
    mapTilesGliderChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_glider/',
    metarTafBaseUrl: 'https://www.aviationweather.gov/cgi-bin/json/MetarJSON.php?taf=true&density=all&bbox=',
};
