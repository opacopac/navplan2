const WEBSITE_BASE_URL = 'https://www.navplan.ch/v2/';

export const environment = {
    production: true,
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
    meteoDwdServiceUrl: WEBSITE_BASE_URL + 'api/meteo/forecasts',
    meteoDwdMapTilesUrl: WEBSITE_BASE_URL + 'meteo_dwd/',
    meteogramApiBaseUrl: WEBSITE_BASE_URL + 'api/meteograms',
    meteoSmaApiBaseUrl: WEBSITE_BASE_URL + 'api/meteo/measurements',
    notamRestApiBaseUrl: WEBSITE_BASE_URL + 'api/notams',
    searchTextApiBaseUrl: WEBSITE_BASE_URL + 'api/search/text',
    searchPositionApiBaseUrl: WEBSITE_BASE_URL + 'api/search/position',
    trackServiceUrl: WEBSITE_BASE_URL + 'api/tracks',
    trafficAdsbexServiceUrl: WEBSITE_BASE_URL + 'api/traffic/adsbex',
    trafficOgnServiceUrl: WEBSITE_BASE_URL + 'api/traffic/ogn',
    trafficDetailServiceUrl: WEBSITE_BASE_URL + 'api/traffic/details',
    userServiceUrl: WEBSITE_BASE_URL + 'api/user',
    verticalMapServiceUrl: WEBSITE_BASE_URL + 'api/verticalmap',
    webcamApiBaseUrl: WEBSITE_BASE_URL + 'api/webcams',
    chartBaseUrl: WEBSITE_BASE_URL + 'charts2/',
    mapTilesIcaoChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_aero/',
    mapTilesGliderChartUrl: WEBSITE_BASE_URL + 'maptiles/icao_ch_glider/',
};
