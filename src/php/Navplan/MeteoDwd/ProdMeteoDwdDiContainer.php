<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWindRepo;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinForecastRepo;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinVerticalCloudRepo;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinVerticalWindRepo;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinWeatherRepo;
use Navplan\MeteoDwd\MeteoBin\Service\MeteoBinWindRepo;
use Navplan\MeteoDwd\Rest\Service\MeteoDwdController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;


class ProdMeteoDwdDiContainer implements IMeteoDwdDiContainer {
    private IRestController $meteoDwdRestController;
    private IMeteoDwdForecastRepo $forecastRepo;
    private IMeteoDwdWeatherRepo $weatherRepo;
    private IMeteoDwdWindRepo $windRepo;
    private IMeteoDwdVerticalCloudRepo $verticalCloudRepo;
    private IMeteoDwdVerticalWindRepo $verticalWindRepo;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IHttpService $httpService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
    }


    public function getMeteoDwdController(): IRestController {
        if (!isset($this->meteoDwdRestController)) {
            $this->meteoDwdRestController = new MeteoDwdController(
                $this->getMeteoDwdForecastRepo(),
                $this->getMeteoDwdWeatherRepo(),
                $this->getMeteoDwdWindRepo(),
                $this->httpService
            );
        }

        return $this->meteoDwdRestController;
    }


    public function getMeteoDwdForecastRepo(): IMeteoDwdForecastRepo {
        if (!isset($this->forecastRepo)) {
            $this->forecastRepo = new MeteoBinForecastRepo(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->forecastRepo;
    }


    public function getMeteoDwdWeatherRepo(): IMeteoDwdWeatherRepo {
        if (!isset($this->weatherRepo)) {
            $this->weatherRepo = new MeteoBinWeatherRepo(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->weatherRepo;
    }


    public function getMeteoDwdWindRepo(): IMeteoDwdWindRepo {
        if (!isset($this->windRepo)) {
            $this->windRepo = new MeteoBinWindRepo(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->windRepo;
    }


    function getMeteoDwdVerticalCloudRepo(): IMeteoDwdVerticalCloudRepo {
        if (!isset($this->verticalCloudRepo)) {
            $this->verticalCloudRepo = new MeteoBinVerticalCloudRepo(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->verticalCloudRepo;
    }


    function getMeteoDwdVerticalWindRepo(): IMeteoDwdVerticalWindRepo {
        if (!isset($this->verticalWindRepo)) {
            $this->verticalWindRepo = new MeteoBinVerticalWindRepo(
                $this->fileService,
                $this->meteoDwdConfig
            );
        }

        return $this->verticalWindRepo;
    }
}
