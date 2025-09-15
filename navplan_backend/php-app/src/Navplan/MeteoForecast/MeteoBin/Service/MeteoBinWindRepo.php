<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\GridDefinition;
use Navplan\MeteoForecast\Domain\Model\ValueGrid;
use Navplan\MeteoForecast\Domain\Model\WindInfo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWindRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinWindInfoConverter;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinWindRepo implements IMeteoForecastWindRepo
{
    public const METEOBIN_WIND_PATH = "/wind/WIND.meteobin";


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoForecastConfig $meteoForecastConfig
    )
    {
    }


    public function readWindInfo(
        ForecastStep $forecastTime,
        GridDefinition $grid
    ): array
    {
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


    private function readWindSpeedENValuesFromFile(ForecastStep $forecastStep, GridDefinition $grid): array
    {
        $fileName = $this->meteoForecastConfig->getMeteoForecastBaseDir()
            . $forecastStep->modelConfig->baseDir
            . $forecastStep->runName
            . "/"
            . StringNumberHelper::zeroPad($forecastStep->step, 3)
            . self::METEOBIN_WIND_PATH;

        $rawContent = $this->fileService->fileGetContents($fileName);

        $iconD2Grid = $forecastStep->modelConfig->gridDefinition;
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
