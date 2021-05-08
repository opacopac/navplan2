<?php declare(strict_types=1);

namespace Navplan\Charts\RestService;

use InvalidArgumentException;
use Navplan\Charts\RestModel\AdChartConverter;


class ChartServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";
    const ACTION_SEARCH_BY_ID = "searchById";


    public static function processRequest(array $args, IChartServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_ICAO:
                $airportIcao = $args["airport_icao"];
                $adChartList = $diContainer->getSearchChartByIcaoUc()->search($airportIcao);
                $httpService->sendArrayResponse(AdChartConverter::listToRest($adChartList));
                break;
            case self::ACTION_SEARCH_BY_ID:
                $id = intval($args["id"]);
                $adChart = $diContainer->getSearchChartByIdUc()->search($id);
                $httpService->sendArrayResponse(AdChartConverter::toRest($adChart));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
