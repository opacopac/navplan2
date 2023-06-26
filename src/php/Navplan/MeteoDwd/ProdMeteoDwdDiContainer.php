<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWindService;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinForecastService;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinVerticalCloudService;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinVerticalWindService;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinWeatherService;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinWindService;
use Navplan\MeteoDwd\Rest\Service\MeteoDwdController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;


class ProdMeteoDwdDiContainer implements IMeteoDwdDiContainer {
    private IRestController $meteoDwdRestController;
    private IMeteoDwdForecastService $forecastService;
    private IMeteoDwdWeatherService $weatherService;
    private IMeteoDwdWindService $windService;
    private IMeteoDwdVerticalCloudService $verticalCloudService;
    private IMeteoDwdVerticalWindService $verticalWindService;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IHttpService $httpService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
    }


    public function getMeteoDwdController(): IRestController {
        if (!isset($this->meteoDwdRestController)) {
            $this->meteoDwdRestController = new MeteoDwdController(
                $this->getMeteoDwdForecastService(),
                $this->getMeteoDwdWeatherService(),
                $this->getMeteoDwdWindService(),
                $this->httpService
            );
        }

        return $this->meteoDwdRestController;
    }


    public function getMeteoDwdForecastService(): IMeteoDwdForecastService {
        if (!isset($this->forecastService)) {
            $this->forecastService = new MeteoBinForecastService(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->forecastService;
    }


    public function getMeteoDwdWeatherService(): IMeteoDwdWeatherService {
        if (!isset($this->weatherService)) {
            $this->weatherService = new MeteoBinWeatherService(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->weatherService;
    }


    public function getMeteoDwdWindService(): IMeteoDwdWindService {
        if (!isset($this->windService)) {
            $this->windService = new MeteoBinWindService(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->windService;
    }


    function getMeteoDwdVerticalCloudService(): IMeteoDwdVerticalCloudService {
        if (!isset($this->verticalCloudService)) {
            $this->verticalCloudService = new MeteoBinVerticalCloudService(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->verticalCloudService;
    }


    function getMeteoDwdVerticalWindService(): IMeteoDwdVerticalWindService {
        if (!isset($this->verticalWindService)) {
            $this->verticalWindService = new MeteoBinVerticalWindService(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->verticalWindService;
    }
}
