<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWindRepo;


interface IMeteoDwdDiContainer {
    function getMeteoDwdController(): IRestController;

    function getMeteoDwdForecastRepo(): IMeteoDwdForecastRepo;

    function getMeteoDwdWeatherRepo(): IMeteoDwdWeatherRepo;

    function getMeteoDwdWindRepo(): IMeteoDwdWindRepo;

    function getMeteoDwdVerticalCloudRepo(): IMeteoDwdVerticalCloudRepo;

    function getMeteoDwdVerticalWindRepo(): IMeteoDwdVerticalWindRepo;
}
