<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastTime;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainModel\ValueGrid;
use Navplan\MeteoDwd\DomainModel\WeatherGrid;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;
use Navplan\MeteoDwd\DomainModel\WindInfo;
use Navplan\MeteoDwd\DomainModel\WindInfoGrid;
use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWeatherInfoConverter;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWindInfoConverter;
use Navplan\System\DomainService\IFileService;


class MeteoBinService implements IMeteoDwdService
{
    public function __construct(
        private IFileService $fileService,
        private string $meteoDwdBaseDir
    ) {
    }


    public function readWindSpeedDirGrid(
        ForecastTime $forecastTime,
        GridDefinition $grid
    ): WindInfoGrid {
        list($windValuesE, $windValuesN, $gustValues) = $this->readWindSpeedENValuesFromFile($forecastTime, $grid);

        $windSpeedDirValues = [];
        for ($y = 0; $y < $grid->height; $y++) {
            $lat = $grid->getLatByY($y);
            for ($x = 0; $x < $grid->width; $x++) {
                $lon = $grid->getLonByX($x);
                $pos = new Position2d($lon, $lat);
                $value_e = $windValuesE->interpolateByLonLat($pos);
                $value_n = $windValuesN->interpolateByLonLat($pos);
                $value_gust = $gustValues->interpolateByLonLat($pos);
                $windSpeedDirValues[] = WindInfo::fromSpeedENGusts($value_e, $value_n, $value_gust, SpeedUnit::KT);
            }
        }

        return new WindInfoGrid($grid, $windSpeedDirValues);
    }


    private function readWindSpeedENValuesFromFile(ForecastTime $forecastTime, GridDefinition $grid): array {
        $interval = StringNumberHelper::zeroPad($forecastTime->interval, 3);
        $fileName = $this->meteoDwdBaseDir . $interval . "/wind/WIND_D2.meteobin"; // TODO
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


    public function readWeatherGrid(ForecastTime $forecastTime, GridDefinition $grid): WeatherGrid {
        $interval = StringNumberHelper::zeroPad($forecastTime->interval, 3);
        $fileName = $this->meteoDwdBaseDir . $interval . "/clct_precip/WW_D2.meteobin"; // TODO
        $rawContent = $this->fileService->fileGetContents($fileName);
        $iconD2Grid = IconGridDefinition::getIconD2Grid();

        $wwValues = [];
        for ($y = 0; $y < $grid->height; $y++) {
            $lat = $grid->getLatByY($y);
            for ($x = 0; $x < $grid->width; $x++) {
                $lon = $grid->getLonByX($x);
                $pos = new Position2d($lon, $lat);

                if ($iconD2Grid->extent->containsPos($pos)) {
                    $icon_x = (int) $iconD2Grid->getXbyLon($lon);
                    $icon_y = (int) $iconD2Grid->getYbyLat($lat);
                    $icon_idx = ($icon_x + $icon_y * $iconD2Grid->width) * 2;

                    $wwValues[] = new WeatherInfo(
                        MeteoBinWeatherInfoConverter::wwFromBinValue($rawContent[$icon_idx]),
                        MeteoBinWeatherInfoConverter::ceilingFtFromBinValue($rawContent[$icon_idx + 1])
                    );
                } else {
                    $wwValues[] = null;
                }
            }
        }

        return new WeatherGrid($grid, $wwValues);
    }
}
