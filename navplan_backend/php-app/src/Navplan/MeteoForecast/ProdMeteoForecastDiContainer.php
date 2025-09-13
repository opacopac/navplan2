<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
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
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;


class ProdMeteoForecastDiContainer implements IMeteoForecastDiContainer {
    private IRestController $meteoForecastRestController;
    private IMeteoForecastRepo $forecastRepo;
    private IMeteoForecastWeatherRepo $weatherRepo;
    private IMeteoForecastWindRepo $windRepo;
    private IMeteoForecastPrecipRepo $precipRepo;
    private IMeteoForecastTempRepo $tempRepo;
    private IMeteoForecastVerticalCloudRepo $verticalCloudRepo;
    private IMeteoForecastVerticalWindRepo $verticalWindRepo;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IHttpService $httpService,
        private readonly IMeteoForecastConfig $meteoForecastConfig
    ) {
    }


    public function getMeteoForecastController(): IRestController {
        if (!isset($this->meteoForecastRestController)) {
            $this->meteoForecastRestController = new MeteoForecastController(
                $this->getMeteoForecastRepo(),
                $this->getMeteoForecastWeatherRepo(),
                $this->getMeteoForecastWindRepo(),
                $this->httpService
            );
        }

        return $this->meteoForecastRestController;
    }


    public function getMeteoForecastRepo(): IMeteoForecastRepo {
        if (!isset($this->forecastRepo)) {
            $this->forecastRepo = new MeteoBinForecastRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->forecastRepo;
    }


    public function getMeteoForecastWeatherRepo(): IMeteoForecastWeatherRepo {
        if (!isset($this->weatherRepo)) {
            $this->weatherRepo = new MeteoBinWeatherRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->weatherRepo;
    }


    public function getMeteoForecastWindRepo(): IMeteoForecastWindRepo {
        if (!isset($this->windRepo)) {
            $this->windRepo = new MeteoBinWindRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->windRepo;
    }



    public function getMeteoForecastPrecipRepo(): IMeteoForecastPrecipRepo {
        if (!isset($this->precipRepo)) {
            $this->precipRepo = new MeteoBinPrecipRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->precipRepo;
    }


    public function getMeteoForecastTempRepo(): IMeteoForecastTempRepo {
        if (!isset($this->tempRepo)) {
            $this->tempRepo = new MeteoBinTempRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->tempRepo;
    }


    public function getMeteoForecastVerticalCloudRepo(): IMeteoForecastVerticalCloudRepo {
        if (!isset($this->verticalCloudRepo)) {
            $this->verticalCloudRepo = new MeteoBinVerticalCloudRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->verticalCloudRepo;
    }


    public function getMeteoForecastVerticalWindRepo(): IMeteoForecastVerticalWindRepo {
        if (!isset($this->verticalWindRepo)) {
            $this->verticalWindRepo = new MeteoBinVerticalWindRepo(
                $this->fileService,
                $this->meteoForecastConfig
            );
        }

        return $this->verticalWindRepo;
    }
}
