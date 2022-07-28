<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestService;

use InvalidArgumentException;
use Navplan\Aerodrome\IAerodromeDiContainer;
use Navplan\Aerodrome\RestModel\RestAirportChart2Converter;
use Navplan\Aerodrome\RestModel\RestAirportChartConverter;
use Navplan\Aerodrome\RestModel\RestAirportCircuitConverter;
use Navplan\Aerodrome\RestModel\RestAirportConverter;
use Navplan\Aerodrome\RestModel\RestReportingPointConverter;
use Navplan\Aerodrome\RestModel\RestShortAirportConverter;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\System\ISystemDiContainer2;


class AirportServiceController {
    const ARG_ACTION = "action";
    const ACTION_GET_SHORT_AD_BY_EXTENT = "getShortAdByExtent";
    const ACTION_GET_AD_BY_ID = "getAdById";
    const ACTION_GET_AD_BY_ICAO = "getAdByIcao";
    const ACTION_GET_AD_CIRCUIT_BY_EXTENT = "getAdCircuitsByExtent";
    const ACTION_GET_RP_BY_EXTENT = "getRpByExtent";
    const ACTION_GET_CHART_BY_ID = "getChartById";
    const ACTION_GET_CHART2_BY_ID = "getChart2ById";


    public static function processRequest(
        ISystemDiContainer2 $systemDiContainer,
        IAerodromeDiContainer $aerodromeDiContainer
    ) {
        $httpService = $systemDiContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_SHORT_AD_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $aerodromeDiContainer->getAirportService()->searchShortByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestShortAirportConverter::listToRest($adList));
                break;
            case self::ACTION_GET_AD_BY_ID:
                $airportId = intval($args["id"]);
                $airport = $aerodromeDiContainer->getAirportService()->readById($airportId);
                $airportRest = RestAirportConverter::toRest($airport);
                $httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_BY_ICAO:
                $icao = $args["icao"];
                $airport = $aerodromeDiContainer->getAirportService()->readByIcao($icao);
                $airportRest = RestAirportConverter::toRest($airport);
                $httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_CIRCUIT_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $adList = $aerodromeDiContainer->getAirportCircuitService()->getCircuitsByExtent($extent);
                $httpService->sendArrayResponse(RestAirportCircuitConverter::listToRest($adList));
                break;
            case self::ACTION_GET_RP_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $rpList = $aerodromeDiContainer->getReportingPointService()->searchByExtent($extent);
                $httpService->sendArrayResponse(RestReportingPointConverter::listToRest($rpList));
                break;
            case self::ACTION_GET_CHART_BY_ID:
                $id = intval($args["id"]);
                $adChart = $aerodromeDiContainer->getAirportChartService()->getAdChartById($id);
                $httpService->sendArrayResponse(RestAirportChartConverter::toRest($adChart));
                break;
            case self::ACTION_GET_CHART2_BY_ID:
                $id = intval($args["id"]);
                $adChart = $aerodromeDiContainer->getAirportChartService()->getAdChart2ById($id);
                $httpService->sendArrayResponse(RestAirportChart2Converter::toRest($adChart));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
