<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use DateTime;
use DateTimeZone;
use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainService\IMeteoDwdConfig;
use Navplan\MeteoDwd\DomainService\IMeteoDwdForecastService;
use Navplan\System\DomainModel\FileServiceException;
use Navplan\System\DomainService\IFileService;


class MeteoBinForecastService implements IMeteoDwdForecastService {
    public const ICON_D2_DIR = "icon-d2/";

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . self::ICON_D2_DIR;
    }


    /**
     * @return ForecastRun[]
     * @throws FileServiceException
     */
    function readAvailableForecasts(): array {
        $subDirs = $this->fileService->glob($this->iconD2BaseDir . '*' , GLOB_ONLYDIR);
        if ($subDirs === false || count($subDirs) === 0) {
            throw new FileServiceException("error reading base directory '" . $this->iconD2BaseDir . "'");
        }

        $forecastRunsUnfilterd = array_map(
            function ($dirEntry) {
                if (!preg_match('/^.*(\d{10})$/', $dirEntry, $matches)) {
                    return null;
                }
                $startTime = DateTime::createFromFormat("YmdH", $matches[1], new DateTimeZone('UTC'));
                $modelConfig = WeatherModelConfig::getIconD2ModelConfig(); // TODO: dynamic

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
}
