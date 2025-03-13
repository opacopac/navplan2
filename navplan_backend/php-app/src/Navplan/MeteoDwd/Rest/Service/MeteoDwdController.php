<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWindRepo;
use Navplan\MeteoDwd\Rest\Model\RestForecastRunConverter;
use Navplan\MeteoDwd\Rest\Model\RestForecastStepConverter;
use Navplan\MeteoDwd\Rest\Model\RestGridDefinitionConverter;
use Navplan\MeteoDwd\Rest\Model\RestWeatherInfoConverter;
use Navplan\MeteoDwd\Rest\Model\RestWindInfoConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class MeteoDwdController implements IRestController
{
    const ARG_FORECAST_RUN = "run";
    const ARG_FORECAST_STEP = "step";
    const ARG_PARAM = "param";
    const ARG_PARAM_WW = "ww";
    const ARG_PARAM_WIND = "wind";


    public function __construct(
        private readonly IMeteoDwdForecastRepo $forecastService,
        private readonly IMeteoDwdWeatherRepo  $weatherService,
        private readonly IMeteoDwdWindRepo     $windService,
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
                throw new InvalidArgumentException("invalid request method");
        }
    }
}
