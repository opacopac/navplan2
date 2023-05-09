<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainModel\ValueGrid;
use Navplan\MeteoDwd\DomainModel\WindInfo;
use Navplan\MeteoDwd\DomainService\IMeteoDwdConfigService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWindService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWindInfoConverter;
use Navplan\System\DomainService\IFileService;


class MeteoBinWindService implements IMeteoDwdWindService {
    public const METEOBIN_WIND_PATH = "/wind/WIND_D2.meteobin";

    private string $iconD2BaseDir;


    public function __construct(
        private IFileService $fileService,
        private IMeteoDwdConfigService $configService
    ) {
        $this->iconD2BaseDir = $this->configService->getMeteoDwdBaseDir() . MeteoBinForecastService::ICON_D2_DIR;
    }


    public function readWindInfo(
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

                if ($value_e !== null && $value_n !== null) {
                    $windSpeedDirValues[] = WindInfo::fromSpeedENGusts($value_e, $value_n, $value_gust, SpeedUnit::KT, $pos);
                }
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
}
