<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\RestModel\RestForecastRunConverter;
use Navplan\MeteoDwd\RestModel\RestForecastStepConverter;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestWeatherInfoConverter;
use Navplan\MeteoDwd\RestModel\RestWindInfoConverter;
use Navplan\System\DomainService\IHttpService;


class MeteoDwdController {
    const ARG_ACTION = "action";
    const ACTION_GET_AVAILABLE_FORECASTS = "readAvailableForecasts";
    const ACTION_GET_WW_VALUES = "readWwValues";
    const ACTION_GET_WIND_VALUES = "readWindValues";


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
            case self::ACTION_GET_WW_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $weatherValues = $meteoDwdService->readWeatherGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWeatherInfoConverter::toRestList($weatherValues));
                break;
            case self::ACTION_GET_WIND_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windValues = $meteoDwdService->readWindSpeedDirGrid($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWindInfoConverter::toRestList($windValues));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
