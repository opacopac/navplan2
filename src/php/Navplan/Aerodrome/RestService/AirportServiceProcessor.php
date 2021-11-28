<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestService;

use InvalidArgumentException;
use Navplan\Aerodrome\RestModel\RestAirportChartConverter;
use Navplan\Aerodrome\RestModel\RestAirportCircuitConverter;
use Navplan\Aerodrome\RestModel\RestAirportConverter;
use Navplan\Aerodrome\RestModel\RestReportingPointConverter;
use Navplan\Aerodrome\RestModel\RestShortAirportConverter;
use Navplan\Common\RestModel\RestExtent2dConverter;


class AirportServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_SHORT_AD_BY_EXTENT = "getShortAdByExtent";
    const ACTION_GET_AD_BY_ID = "getAdById";
    const ACTION_GET_AD_BY_ICAO = "getAdByIcao";
    const ACTION_GET_AD_CIRCUIT_BY_EXTENT = "getAdCircuitsByExtent";
    const ACTION_GET_RP_BY_EXTENT = "getRpByExtent";
    const ACTION_GET_CHART_BY_ID = "getChartById";


    public static function processRequest(IAirportServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_SHORT_AD_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $diContainer->getAirportRepo()->searchShortByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestShortAirportConverter::listToRest($adList));
                break;
            case self::ACTION_GET_AD_BY_ID:
                $airportId = intval($args["id"]);
                $airport = $diContainer->getAirportRepo()->readById($airportId);
                $airportRest = RestAirportConverter::toRest($airport);
                $httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_BY_ICAO:
                $icao = $args["icao"];
                $airport = $diContainer->getAirportRepo()->readByIcao($icao);
                $airportRest = RestAirportConverter::toRest($airport);
                $httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_CIRCUIT_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $adList = $diContainer->getAirportCircuitRepo()->getCircuitsByExtent($extent);
                $httpService->sendArrayResponse(RestAirportCircuitConverter::listToRest($adList));
                break;
            case self::ACTION_GET_RP_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $rpList = $diContainer->getReportingPointRepo()->searchByExtent($extent);
                $httpService->sendArrayResponse(RestReportingPointConverter::listToRest($rpList));
                break;
            case self::ACTION_GET_CHART_BY_ID:
                $id = intval($args["id"]);
                $adChart = $diContainer->getAirportChartRepo()->getAdChartById($id);
                $httpService->sendArrayResponse(RestAirportChartConverter::toRest($adChart));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
