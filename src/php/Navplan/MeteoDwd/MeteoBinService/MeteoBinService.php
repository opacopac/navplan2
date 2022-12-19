<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use DateTime;
use DateTimeZone;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastRun;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainModel\ValueGrid;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;
use Navplan\MeteoDwd\DomainModel\WeatherModelConfig;
use Navplan\MeteoDwd\DomainModel\WeatherModelType;
use Navplan\MeteoDwd\DomainModel\WindInfo;
use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWeatherInfoConverter;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWindInfoConverter;
use Navplan\System\DomainModel\FileServiceException;
use Navplan\System\DomainService\IFileService;


class MeteoBinService implements IMeteoDwdService {
    private const ICON_D2_DIR = "icon-d2/";
    private const METEOBIN_WW_PATH = "/clct_precip/WW_D2.meteobin";
    private const METEOBIN_WIND_PATH = "/wind/WIND_D2.meteobin";

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


    public function readWindSpeedDirGrid(
        ForecastStep $forecastTime,
        GridDefinition $grid
    ): array {
        list($windValuesE, $windValuesN, $gustValues) = $this->readWindSpeedENValuesFromFile($forecastTime, $grid);

        $windSpeedDirValues = [];
        for ($y = 0; $y < $grid->height; $y++) {
            $lat = $grid->getLat($y);
            for ($x = 0; $x < $grid->width; $x++) {
                $lon = $grid->getLonWithOffset($x, $y);
                $pos = new Position2d($lon, $lat);
                $value_e = $windValuesE->interpolateByLonLat($pos);
                $value_n = $windValuesN->interpolateByLonLat($pos);
                $value_gust = $gustValues->interpolateByLonLat($pos);
                $windSpeedDirValues[] = WindInfo::fromSpeedENGusts($value_e, $value_n, $value_gust, SpeedUnit::KT, $pos);
            }
        }

        return $windSpeedDirValues;
    }


    private function readWindSpeedENValuesFromFile(ForecastStep $forecastStep, GridDefinition $grid): array {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->run . "/" . $step . self::METEOBIN_WIND_PATH;
        $rawContent = $this->fileService->fileGetContents($fileName);

        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $e_values = [];
        $n_values = [];
        $gust_values = [];
        for ($y = 0; $y < $iconD2Grid->height; $y++) {
            for ($x = 0; $x < $iconD2Grid->width; $x++) {
                $idx = ($x + $y * $iconD2Grid->width) * 3;
                $e_values[] = $rawContent[$idx];
                $n_values[] = $rawContent[$idx + 1];
                $gust_values[] = $rawContent[$idx + 2];
            }
        }

        $convertWindSpeedValueFn = function (string $binValue): float|null {
            return MeteoBinWindInfoConverter::windKtfromBinValue($binValue);
        };


        $convertGustValueFn = function (string $binValue): float|null {
            return MeteoBinWindInfoConverter::gustKtFromBinValue($binValue);
        };


        return [
            new ValueGrid($iconD2Grid, $e_values, $convertWindSpeedValueFn),
            new ValueGrid($iconD2Grid, $n_values, $convertWindSpeedValueFn),
            new ValueGrid($iconD2Grid, $gust_values, $convertGustValueFn)
        ];
    }


    public function readWeatherGrid(ForecastStep $forecastStep, GridDefinition $grid): array {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->run . "/" . $step . self::METEOBIN_WW_PATH;

        $rawContent = $this->fileService->fileGetContents($fileName);
        $iconD2Grid = IconGridDefinition::getIconD2Grid();

        $wwValues = [];
        for ($y = 0; $y < $grid->height; $y++) {
            $lat = $grid->getLat($y);
            for ($x = 0; $x < $grid->width; $x++) {
                $lon = $grid->getLonWithOffset($x, $y);
                $pos = new Position2d($lon, $lat);

                if ($iconD2Grid->extent->containsPos($pos)) {
                    $icon_x = (int) $iconD2Grid->getX($lon);
                    $icon_y = (int) $iconD2Grid->getY($lat);
                    $icon_idx = ($icon_x + $icon_y * $iconD2Grid->width) * 2;

                    $wwValues[] = new WeatherInfo(
                        MeteoBinWeatherInfoConverter::wwFromBinValue($rawContent[$icon_idx]),
                        MeteoBinWeatherInfoConverter::ceilingFtFromBinValue($rawContent[$icon_idx + 1]),
                        $pos
                    );
                } else {
                    $wwValues[] = null;
                }
            }
        }

        return $wwValues;
    }


    // TODO => domain
    public function getIconD2ModelConfig(): WeatherModelConfig {
        return new WeatherModelConfig(WeatherModelType::ICON_D2, 2, 48, new Time(1, TimeUnit::H));
    }
}
