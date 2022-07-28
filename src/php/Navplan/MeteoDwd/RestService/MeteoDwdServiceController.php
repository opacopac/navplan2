<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\RestModel\RestForecastRunConverter;
use Navplan\MeteoDwd\RestModel\RestForecastStepConverter;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestWeatherInfoGridConverter;
use Navplan\MeteoDwd\RestModel\RestWindInfoGridConverter;
use Navplan\System\DomainService\IHttpService;


class MeteoDwdServiceController {
    const ARG_ACTION = "action";
    const ACTION_GET_AVAILABLE_FORECASTS = "readAvailableForecasts";
    const ACTION_GET_WIND_GRID = "readWindGrid";
    const ACTION_GET_WW_GRID = "readWwGrid";


    public static function processRequest(
        IMeteoDwdService $meteoDwdService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AVAILABLE_FORECASTS:
                $availableForecasts = $meteoDwdService->readAvailableForecasts();
                $httpService->sendArrayResponse(RestForecastRunConverter::toRestList($availableForecasts));
                break;
            case self::ACTION_GET_WIND_GRID:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windGrid = $meteoDwdService->readWindSpeedDirGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWindInfoGridConverter::toRest($windGrid));
                break;
            case self::ACTION_GET_WW_GRID:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $weatherGrid = $meteoDwdService->readWeatherGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWeatherInfoGridConverter::toRest($weatherGrid));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
