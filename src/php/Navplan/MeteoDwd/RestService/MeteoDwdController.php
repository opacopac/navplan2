<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestService;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalWindService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;
use Navplan\MeteoDwd\RestModel\RestForecastRunConverter;
use Navplan\MeteoDwd\RestModel\RestForecastStepConverter;
use Navplan\MeteoDwd\RestModel\RestGridDefinitionConverter;
use Navplan\MeteoDwd\RestModel\RestReadVerticalCloudsRequest;
use Navplan\MeteoDwd\RestModel\RestReadVerticalWindRequest;
use Navplan\MeteoDwd\RestModel\RestVerticalCloudColumnConverter;
use Navplan\MeteoDwd\RestModel\RestVerticalWindColumnConverter;
use Navplan\MeteoDwd\RestModel\RestWeatherInfoConverter;
use Navplan\MeteoDwd\RestModel\RestWindInfoConverter;
use Navplan\System\DomainModel\HttpRequestMethod;
use Navplan\System\DomainService\IHttpService;


class MeteoDwdController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_READ_AVAILABLE_FORECASTS = "readAvailableForecasts";
    const ACTION_READ_WW_VALUES = "readWwValues";
    const ACTION_READ_WIND_VALUES = "readWindValues";
    const ACTION_READ_VERT_CLOUD_VALUES = "readVerticalCloudValues";
    const ACTION_READ_VERT_WIND_VALUES = "readVerticalWindValues";
    const VERTICAL_CLOUDS_MAX_STEPS = 500;


    public function __construct(
        private IMeteoDwdForecastService $forecastService,
        private IMeteoDwdWeatherService $weatherService,
        private IMeteoDwdWindService $windService,
        private IMeteoDwdVerticalCloudService $verticalCloudService,
        private IMeteoDwdVerticalWindService $verticalWindService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        $args = match ($this->httpService->getRequestMethod()) {
            HttpRequestMethod::GET => $this->httpService->getGetArgs(),
            HttpRequestMethod::POST => $this->httpService->getPostArgs(),
            default => throw new InvalidArgumentException('unknown request method'),
        };
        $action = $args[self::ARG_ACTION] ?? NULL;

        switch ($action) {
            case self::ACTION_READ_AVAILABLE_FORECASTS:
                $availableForecasts = $this->forecastService->readAvailableForecasts();
                $this->httpService->sendArrayResponse(RestForecastRunConverter::toRestList($availableForecasts));
                break;
            case self::ACTION_READ_WW_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $weatherValues = $this->weatherService->readWeatherInfo($forecastTime, $grid);
                $this->httpService->sendArrayResponse(RestWeatherInfoConverter::toRestList($weatherValues));
                break;
            case self::ACTION_READ_WIND_VALUES:
                $forecastTime = RestForecastStepConverter::fromRest($args);
                $grid = RestGridDefinitionConverter::fromRest($args);
                $windValues = $this->windService->readWindInfo($forecastTime, $grid);
                $this->httpService->sendArrayResponse(RestWindInfoConverter::toRestList($windValues));
                break;
            case self::ACTION_READ_VERT_CLOUD_VALUES:
                $request = RestReadVerticalCloudsRequest::fromRest($args);
                $minStepSize = WeatherModelConfig::getIconD2ModelConfig()->gridResolution; // TODO: dynamic
                $subDivPosList = $request->waypoints->subdividePosList($minStepSize, self::VERTICAL_CLOUDS_MAX_STEPS);
                $vertCloudValues = $this->verticalCloudService->readVerticalCloudInfo($request->forecastStep, $subDivPosList);
                $this->httpService->sendArrayResponse(RestVerticalCloudColumnConverter::toRestList($vertCloudValues));
                break;
            case self::ACTION_READ_VERT_WIND_VALUES:
                $request = RestReadVerticalWindRequest::fromRest($args);
                $minStepSize = WeatherModelConfig::getIconD2ModelConfig()->gridResolution; // TODO: dynamic
                $subDivPosList = $request->waypoints->subdividePosList($minStepSize, self::VERTICAL_CLOUDS_MAX_STEPS);
                $vertWindValues = $this->verticalWindService->readVerticalWindInfo($request->forecastStep, $subDivPosList);
                $this->httpService->sendArrayResponse(RestVerticalWindColumnConverter::toRestList($vertWindValues));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
