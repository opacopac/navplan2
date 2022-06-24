// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// const WEBSITE_BASE_URL = 'https://www.navplan.ch/v2/';
const WEBSITE_BASE_URL = 'http://localhost/navplan2/';

export const environment = {
    production: false,
    mapOversizeFactor: 1.3,
    iconBaseUrl: './assets/icon/',
    airportServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Aerodrome/RestService/AirportService.php',
    airspaceServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/RestService/AirspaceService.php',
    navaidServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Enroute/RestService/NavaidService.php',
    webcamServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Webcam/RestService/WebcamService.php',
    flightrouteServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Flightroute/RestService/FlightrouteService.php',
    meteoSmaServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoSma/RestService/MeteoService.php',
    meteoDwdServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/MeteoDwd/RestService/MeteoDwdService.php',
    meteoDwdMapTilesUrl: WEBSITE_BASE_URL + 'meteo_dwd/',
    notamRestServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Notam/RestService/NotamService.php',
    openAipServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    searchServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    trackServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Track/RestService/TrackService.php',
    trafficAdsbexServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readadsbextraffic',
    trafficOgnServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readogntraffic',
    trafficDetailServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php',
    userServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/User/RestService/UserService.php',
    verticalMapServiceUrl: WEBSITE_BASE_URL + 'php/Navplan/VerticalMap/RestService/VerticalMapService.php',
    exporterBaseUrl: WEBSITE_BASE_URL + 'php/Navplan/Exporter/RestService/ExporterService.php',
    exportBaseUrl: WEBSITE_BASE_URL + 'tmp/',
    chartBaseUrl: WEBSITE_BASE_URL + 'charts/',
    chart2BaseUrl: WEBSITE_BASE_URL + 'charts2/',
    metarTafBaseUrl: 'https://www.aviationweather.gov/cgi-bin/json/MetarJSON.php?taf=true&density=all&bbox=',
};
