<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the MeteoForecast module.
 * Replaces the former ProdMeteoForecastDiContainer.
 */

use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWeatherRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWindRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinForecastRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinPrecipRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinTempRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinVerticalCloudRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinVerticalWindRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinWeatherRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinWindRepo;
use Navplan\MeteoForecast\Rest\Service\MeteoForecastController;
use function DI\autowire;

return [
    // IMeteoForecastRepo/WeatherRepo/WindRepo have no external facade getter
    // (only used internally by MeteoForecastController), but the bindings are
    // still needed for autowiring.
    IMeteoForecastRepo::class => autowire(MeteoBinForecastRepo::class),
    IMeteoForecastWeatherRepo::class => autowire(MeteoBinWeatherRepo::class),
    IMeteoForecastWindRepo::class => autowire(MeteoBinWindRepo::class),
    IMeteoForecastPrecipRepo::class => autowire(MeteoBinPrecipRepo::class),
    IMeteoForecastTempRepo::class => autowire(MeteoBinTempRepo::class),
    IMeteoForecastVerticalCloudRepo::class => autowire(MeteoBinVerticalCloudRepo::class),
    IMeteoForecastVerticalWindRepo::class => autowire(MeteoBinVerticalWindRepo::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    MeteoForecastController::class => autowire(),
];

