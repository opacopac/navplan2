<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use DateTime;
use DateTimeZone;
use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainModel\WeatherModelType;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\System\DomainModel\FileServiceException;
use Navplan\System\DomainService\IFileService;


class MeteoBinForecastService implements IMeteoDwdForecastService {
    public const ICON_D2_DIR = "icon-d2/"; // TODO: config

    private string $iconD2BaseDir;


    public function __construct(
        private IFileService $fileService,
        private string $meteoDwdBaseDir
    ) {
        $this->iconD2BaseDir = $this->meteoDwdBaseDir . self::ICON_D2_DIR;
    }


    /**
     * @return ForecastRun[]
     * @throws FileServiceException
     */
    function readAvailableForecasts(): array {
        $subDirs = $this->fileService->glob($this->iconD2BaseDir . '*' , GLOB_ONLYDIR);
        if ($subDirs === false) {
            throw new FileServiceException("error reading base directory '" . $this->iconD2BaseDir . "'");
        }

        $forecastRunsUnfilterd = array_map(
            function ($dirEntry) {
                if (!preg_match('/^.*(\d{10})$/', $dirEntry, $matches)) {
                    return null;
                }
                $startTime = DateTime::createFromFormat("YmdH", $matches[1], new DateTimeZone('UTC'));
                $modelConfig = $this->getIconD2ModelConfig(); // TODO

                return new ForecastRun($startTime, $modelConfig);
            },
            $subDirs
        );

        $forecastRuns = [];
        foreach ($forecastRunsUnfilterd as $fcRun) {
            if ($fcRun != null) {
                $forecastRuns[] = $fcRun;
            }
        }

        return $forecastRuns;
    }


    // TODO
    public function getIconD2ModelConfig(): WeatherModelConfig {
        return new WeatherModelConfig(WeatherModelType::ICON_D2, 2, 48, new Time(1, TimeUnit::H));
    }
}
