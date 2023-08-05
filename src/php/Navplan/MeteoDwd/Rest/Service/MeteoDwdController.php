<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
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


class MeteoDwdController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_READ_AVAILABLE_FORECASTS = "readAvailableForecasts";
    const ACTION_READ_WW_VALUES = "readWwValues";
    const ACTION_READ_WIND_VALUES = "readWindValues";


    public function __construct(
        private readonly IMeteoDwdForecastRepo $forecastService,
        private readonly IMeteoDwdWeatherRepo $weatherService,
        private readonly IMeteoDwdWindRepo $windService,
        private readonly IHttpService $httpService
    ) {
    }


    public function processRequest(): void {
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
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
