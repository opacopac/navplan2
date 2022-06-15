<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\MeteoDwd\RestModel\RestForecastTimeConverter;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestWindSpeedDirGridConverter;
use Navplan\MeteoDwd\RestModel\RestWwGridConverter;


class MeteoDwdServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_WIND_GRID = "readWindGrid";
    const ACTION_GET_WW_GRID = "readWwGrid";


    public static function processRequest(IMeteoDwdServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_WIND_GRID:
                $forecastTime = RestForecastTimeConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windGrid = $diContainer->getMeteoDwdService()->readWindSpeedDirGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWindSpeedDirGridConverter::toRest($windGrid));
                break;
            case self::ACTION_GET_WW_GRID:
                $forecastTime = RestForecastTimeConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $wwGrid = $diContainer->getMeteoDwdService()->readWwGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWwGridConverter::toRest($wwGrid));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
