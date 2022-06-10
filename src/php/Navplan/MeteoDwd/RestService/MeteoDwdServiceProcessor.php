<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\MeteoDwd\DomainModel\ForecastTime;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestWindSpeedDirGridConverter;


class MeteoDwdServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_WIND_BY_GRID = "getWindByGrid";


    public static function processRequest(IMeteoDwdServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_WIND_BY_GRID:
                $forecast = new ForecastTime(); // TODO
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windGrid = $diContainer->getMeteoDwdService()->readWindSpeedDirGrid($forecast, $grid);
                $httpService->sendArrayResponse(RestWindSpeedDirGridConverter::toRest($windGrid));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
