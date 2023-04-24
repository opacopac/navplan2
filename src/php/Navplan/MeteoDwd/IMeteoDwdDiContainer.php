<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalWindService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;


interface IMeteoDwdDiContainer {
    function getMeteoDwdController(): IRestController;

    function getMeteoDwdForecastService(): IMeteoDwdForecastService;

    function getMeteoDwdWeatherService(): IMeteoDwdWeatherService;

    function getMeteoDwdWindService(): IMeteoDwdWindService;

    function getMeteoDwdVerticalCloudService(): IMeteoDwdVerticalCloudService;

    function getMeteoDwdVerticalWindService(): IMeteoDwdVerticalWindService;
}
