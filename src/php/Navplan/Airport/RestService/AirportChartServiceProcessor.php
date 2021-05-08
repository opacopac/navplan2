<?php declare(strict_types=1);

namespace Navplan\Airport\RestService;

use InvalidArgumentException;
use Navplan\Airport\RestModel\RestAirportChartConverter;


class AirportChartServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";
    const ACTION_SEARCH_BY_ID = "searchById";


    public static function processRequest(array $args, IAirportChartServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_ICAO:
                $airportIcao = $args["airport_icao"];
                $adChartList = $diContainer->getAirportChartRepo()->getAdChartsByIcao($airportIcao);
                $httpService->sendArrayResponse(RestAirportChartConverter::listToRest($adChartList));
                break;
            case self::ACTION_SEARCH_BY_ID:
                $id = intval($args["id"]);
                $adChart = $diContainer->getAirportChartRepo()->getAdChartById($id);
                $httpService->sendArrayResponse(RestAirportChartConverter::toRest($adChart));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
