<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWeatherRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWindRepo;
use Navplan\MeteoForecast\Rest\Model\RestForecastRunConverter;
use Navplan\MeteoForecast\Rest\Model\RestForecastStepConverter;
use Navplan\MeteoForecast\Rest\Model\RestGridDefinitionConverter;
use Navplan\MeteoForecast\Rest\Model\RestWeatherInfoConverter;
use Navplan\MeteoForecast\Rest\Model\RestWindInfoConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class MeteoForecastController implements IRestController
{
    const string ARG_FORECAST_RUN = "run";
    const string ARG_FORECAST_STEP = "step";
    const string ARG_PARAM = "param";
    const string ARG_PARAM_WW = "ww";
    const string ARG_PARAM_WIND = "wind";


    public function __construct(
        private readonly IMeteoForecastRepo $forecastService,
        private readonly IMeteoForecastWeatherRepo  $weatherService,
        private readonly IMeteoForecastWindRepo     $windService,
        private readonly IHttpService          $httpService
    )
    {
    }


    public function processRequest(): void
    {
        $args = $this->httpService->getGetArgs();
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $run = StringNumberHelper::parseStringOrNull($args, self::ARG_FORECAST_RUN);
                $step = StringNumberHelper::parseIntOrNull($args, self::ARG_FORECAST_STEP);
                if ($run && $step) {
                    $param = StringNumberHelper::parseStringOrError($args, self::ARG_PARAM);
                    if ($param === self::ARG_PARAM_WW) {
                        $forecastTime = RestForecastStepConverter::fromRest($args);
                        $grid = RestGridDefinitionConverter::fromRest($args);
                        $weatherValues = $this->weatherService->readWeatherInfo($forecastTime, $grid);
                        $response = RestWeatherInfoConverter::toRestList($weatherValues);
                    } elseif ($param === self::ARG_PARAM_WIND) {
                        $forecastTime = RestForecastStepConverter::fromRest($args);
                        $grid = RestGridDefinitionConverter::fromRest($args);
                        $windValues = $this->windService->readWindInfo($forecastTime, $grid);
                        $response = RestWindInfoConverter::toRestList($windValues);
                    } else {
                        throw new InvalidArgumentException("invalid parameter '" . $param . "'");
                    }
                } else {
                    $availableForecasts = $this->forecastService->readAvailableForecasts();
                    $response = RestForecastRunConverter::toRestList($availableForecasts);
                }
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
