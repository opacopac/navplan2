// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// const REST_API_BASE_URL = 'https://www.navplan.ch/v2/';
const REST_SERVICE_BASE_URL = 'http://localhost/navplan2/';

export const environment = {
    production: false,
    flightrouteServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Flightroute/RestService/FlightrouteService.php',
    notamRestServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Notam/RestService/NotamService.php',
    openAipServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    searchServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    trackServiceUrl: REST_SERVICE_BASE_URL + 'php/userTrack.php',
    trafficAdsbexServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readadsbextraffic',
    trafficOgnServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readogntraffic',
    trafficDetailServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php',
    userServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/User/RestService/UserService.php',
    iconBaseUrl: './assets/icon/',
    mapOversizeFactor: 1.3
};
