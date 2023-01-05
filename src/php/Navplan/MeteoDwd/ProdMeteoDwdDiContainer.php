<?php declare(strict_types=1);

namespace Navplan\MeteoDwd;

use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinForecastService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinVerticalCloudService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinWeatherService;
use Navplan\MeteoDwd\MeteoBinService\MeteoBinWindService;
use Navplan\System\DomainService\IFileService;


class ProdMeteoDwdDiContainer implements IMeteoDwdDiContainer {
    private const METEO_DWD_BASE_DIR = __DIR__ . "/../../../../meteo_dwd/"; // TODO: config

    private IMeteoDwdForecastService $forecastService;
    private IMeteoDwdWeatherService $weatherService;
    private IMeteoDwdWindService $windService;
    private IMeteoDwdVerticalCloudService $verticalCloudService;


    public function __construct(
        private IFileService $fileService,
    ) {
    }


    public function getMeteoDwdForecastService(): IMeteoDwdForecastService {
        if (!isset($this->forecastService)) {
            $this->forecastService = new MeteoBinForecastService(
                $this->fileService,
                self::METEO_DWD_BASE_DIR
            );
        }

        return $this->forecastService;
    }


    public function getMeteoDwdWeatherService(): IMeteoDwdWeatherService {
        if (!isset($this->weatherService)) {
            $this->weatherService = new MeteoBinWeatherService(
                $this->fileService,
                self::METEO_DWD_BASE_DIR
            );
        }

        return $this->weatherService;
    }


    public function getMeteoDwdWindService(): IMeteoDwdWindService {
        if (!isset($this->windService)) {
            $this->windService = new MeteoBinWindService(
                $this->fileService,
                self::METEO_DWD_BASE_DIR
            );
        }

        return $this->windService;
    }


    function getMeteoDwdVerticalCloudService(): IMeteoDwdVerticalCloudService {
        if (!isset($this->verticalCloudService)) {
            $this->verticalCloudService = new MeteoBinVerticalCloudService(
                $this->fileService,
                self::METEO_DWD_BASE_DIR
            );
        }

        return $this->verticalCloudService;
    }
}
