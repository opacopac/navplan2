<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWindService;


interface IMeteoDwdDiContainer {
    function getMeteoDwdController(): IRestController;

    function getMeteoDwdForecastService(): IMeteoDwdForecastService;

    function getMeteoDwdWeatherService(): IMeteoDwdWeatherService;

    function getMeteoDwdWindService(): IMeteoDwdWindService;

    function getMeteoDwdVerticalCloudService(): IMeteoDwdVerticalCloudService;

    function getMeteoDwdVerticalWindService(): IMeteoDwdVerticalWindService;
}
