<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\DomainService\IMeteoDwdConfig;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalWindService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinForecastService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinVerticalCloudService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinVerticalWindService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinWeatherService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinWindService;
use Navplan\MeteoDwd\RestService\MeteoDwdController;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;


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
