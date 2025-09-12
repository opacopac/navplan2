<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Service;

use DateTime;
use DateTimeZone;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;
use Navplan\MeteoDwd\Domain\Model\ForecastRun;
use Navplan\MeteoDwd\Domain\Model\WeatherModelConfig;
use Navplan\MeteoDwd\Domain\Model\WeatherModelType;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdForecastRepo;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinForecastRepo implements IMeteoDwdForecastRepo
{
    public const ICON_D2_DIR = "icon-d2/";
    public const ICON_CH1_DIR = "icon-ch1/";

    private string $iconD2BaseDir;
    private string $iconCh1BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    )
    {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . self::ICON_D2_DIR;
        $this->iconCh1BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . self::ICON_CH1_DIR;
    }


    /**
     * @return ForecastRun[]
     */
    function readAvailableForecasts(): array
    {
        $fcRuns = [];

        $latestIconCh1Run = $this->findLatestModelForecast(WeatherModelType::ICON_CH1, $this->iconCh1BaseDir);
        if ($latestIconCh1Run != null) {
            $fcRuns[] = $latestIconCh1Run;
        }

        $latestIconD2Run = $this->findLatestModelForecast(WeatherModelType::ICON_D2, $this->iconD2BaseDir);
        if ($latestIconD2Run != null) {
            $fcRuns[] = $latestIconD2Run;
        }

        return $fcRuns;
    }


    function findLatestModelForecast(int $modelType, string $modelDir): ?ForecastRun
    {
        $fcRunDirs = $this->fileService->glob($modelDir . '*', GLOB_ONLYDIR);
        if ($fcRunDirs === false || count($fcRunDirs) === 0) {
            return null;
        }

        $fcRunsUnfilterd = array_map(
            function ($fcRunDirEntry) use ($modelType, $modelDir) {
                if (!preg_match('/^.*(\d{10})$/', $fcRunDirEntry, $matches)) {
                    return null;
                }
                $steps = $this->findModelSteps($modelDir, $fcRunDirEntry);
                $startTime = DateTime::createFromFormat("YmdH", $matches[1], new DateTimeZone('UTC'));
                $modelConfig = $this->createWeatherModelConfig($modelType, $steps);
                if ($modelConfig == null) {
                    return null;
                } else {
                    return new ForecastRun($startTime, $modelConfig);
                }
            },
            $fcRunDirs
        );

        // filter nulls
        $fcRuns = array_filter($fcRunsUnfilterd, function ($fcRun) {
            return $fcRun != null;
        });

        // order descending
        usort($fcRuns, function ($a, $b) {
            return $b->startTime <=> $a->startTime;
        });

        if (count($fcRuns) === 0) {
            return null;
        } else {
            return $fcRuns[0];
        }
    }


    /**
     * search forecast directory for step sub-directories (e.g. "002", "004", ...)
     * @param string $modelDir
     * @param string $fcRunDir
     * @return string[] step directories as strings
     */
    function findModelSteps(string $modelDir, string $fcRunDir): array
    {
        $stepDirs = $this->fileService->glob($fcRunDir . '/*', GLOB_ONLYDIR);
        if ($stepDirs === false || count($stepDirs) === 0) {
            return [];
        }

        $stepsUnfilterd = array_map(
            function ($stepDirEntry) use ($modelDir) {
                if (!preg_match('/^.*\/(\d{3})$/', $stepDirEntry, $matches)) {
                    return null;
                }
                return intval($matches[1]);
            },
            $stepDirs
        );

        // filter nulls
        $steps = array_filter($stepsUnfilterd, function ($step) {
            return $step != null;
        });

        // order ascending
        sort($steps);

        return $steps;
    }


    /**
     * create WeatherModelConfig from model type and available steps
     * @param int $modelType
     * @param string[] $steps
     * @return WeatherModelConfig|null
     */
    function createWeatherModelConfig(int $modelType, array $steps): ?WeatherModelConfig
    {
        $intSteps = array_map(
            function ($step) {
                return intval($step);
            },
            $steps
        );

        return match ($modelType) {
            WeatherModelType::ICON_D2 => new WeatherModelConfig(
                WeatherModelType::ICON_D2,
                min($intSteps),
                max($intSteps),
                new Time(1, TimeUnit::H), // TODO: get from model metadata
                Length::fromM(2200) // TODO: get from model metadata
            ),
            WeatherModelType::ICON_CH1 => new WeatherModelConfig(
                WeatherModelType::ICON_CH1,
                min($intSteps),
                max($intSteps),
                new Time(1, TimeUnit::H), // TODO: get from model metadata
                Length::fromM(1100) // TODO: get from model metadata
            ),
            default => null,
        };
    }
}
