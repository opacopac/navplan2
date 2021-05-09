<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use InvalidArgumentException;
use Navplan\Airport\RestModel\RestAirportChartConverter;
use Navplan\Airport\RestModel\RestAirportConverter;
use Navplan\Airport\RestModel\RestShortAirportConverter;
use Navplan\Common\RestModel\RestExtent2dConverter;


class AirportServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_AD_BY_ICAO = "getAdByIcao";
    const ACTION_GET_SHORT_AD_BY_EXTENT = "getShortAdByExtent";
    const ACTION_GET_CHARTS_BY_ICAO = "getChartsByIcao";
    const ACTION_GET_CHART_BY_ID = "getChartById";


    public static function processRequest(array $args, IAirportServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AD_BY_ICAO:
                $airportIcao = $args["icao"];
                $adList = $diContainer->getAirportRepo()->searchByIcao([$airportIcao]);
                $airport = count($adList) > 0 ? RestAirportConverter::toRest($adList[0]) : [];
                $httpService->sendArrayResponse($airport);
                break;
            case self::ACTION_GET_SHORT_AD_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $diContainer->getAirportRepo()->searchShortByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestShortAirportConverter::listToRest($adList));
                break;
            case self::ACTION_GET_CHARTS_BY_ICAO:
                $airportIcao = $args["icao"];
                $adChartList = $diContainer->getAirportChartRepo()->getAdChartsByIcao($airportIcao);
                $httpService->sendArrayResponse(RestAirportChartConverter::listToRest($adChartList));
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
