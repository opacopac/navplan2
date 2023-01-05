<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;


interface IMeteoDwdDiContainer {
    function getMeteoDwdForecastService(): IMeteoDwdForecastService;

    function getMeteoDwdWeatherService(): IMeteoDwdWeatherService;

    function getMeteoDwdWindService(): IMeteoDwdWindService;

    function getMeteoDwdVerticalCloudService(): IMeteoDwdVerticalCloudService;
}
