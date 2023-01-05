<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;
use Navplan\MeteoDwd\RestModel\RestForecastRunConverter;
use Navplan\MeteoDwd\RestModel\RestForecastStepConverter;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestVerticalCloudColumnConverter;
use Navplan\MeteoDwd\RestModel\RestWeatherInfoConverter;
use Navplan\MeteoDwd\RestModel\RestWindInfoConverter;
use Navplan\System\DomainService\IHttpService;


class MeteoDwdController {
    const ARG_ACTION = "action";
    const ACTION_GET_AVAILABLE_FORECASTS = "readAvailableForecasts";
    const ACTION_GET_WW_VALUES = "readWwValues";
    const ACTION_GET_WIND_VALUES = "readWindValues";
    const ACTION_GET_VERT_CLOUD_VALUES = "readVerticalCloudValues";


    public static function processRequest(
        IMeteoDwdForecastService $forecastService,
        IMeteoDwdWeatherService $weatherService,
        IMeteoDwdWindService $windService,
        IMeteoDwdVerticalCloudService $verticalCloudService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AVAILABLE_FORECASTS:
                $availableForecasts = $forecastService->readAvailableForecasts();
                $httpService->sendArrayResponse(RestForecastRunConverter::toRestList($availableForecasts));
                break;
            case self::ACTION_GET_WW_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $weatherValues = $weatherService->readWeatherInfo($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWeatherInfoConverter::toRestList($weatherValues));
                break;
            case self::ACTION_GET_WIND_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windValues = $windService->readWindInfo($forecastTime, $grid);
                $httpService->sendArrayResponse(RestWindInfoConverter::toRestList($windValues));
                break;
            case self::ACTION_GET_VERT_CLOUD_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $posList = [new Position2d(7.0, 47.0)]; // TODO
                $vertCloudValues = $verticalCloudService->readVerticalCloudInfo($forecastTime, $posList);
                $httpService->sendArrayResponse(RestVerticalCloudColumnConverter::toRestList($vertCloudValues));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
