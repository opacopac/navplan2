const REST_SERVICE_BASE_URL = 'https://www.navplan.ch/v2/';

export const environment = {
    production: true,
    flightrouteServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Flightroute/RestService/FlightrouteService.php',
    notamRestServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Notam/RestService/NotamService.php',
    openAipServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    searchServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Search/RestService/SearchService.php',
    trackServiceUrl: REST_SERVICE_BASE_URL + 'php/userTrack.php',
    trafficAdsbexServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readadsbextraffic',
    trafficOgnServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php?action=readogntraffic',
    trafficDetailServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/Traffic/RestService/TrafficService.php',
    userServiceUrl: REST_SERVICE_BASE_URL + 'php/Navplan/User/RestService/RestUserService.php',
    iconBaseUrl: './assets/icon/',
    mapOversizeFactor: 1.3
};
