<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\MeteoDwd\DomainModel\ForecastTime;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainModel\ValueGrid;
use Navplan\MeteoDwd\DomainModel\WindSpeedDir;
use Navplan\MeteoDwd\DomainModel\WindSpeedDirGrid;
use Navplan\MeteoDwd\DomainService\IMeteoDwdService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWindSpeedDirConverter;
use Navplan\System\DomainService\IFileService;


class MeteoBinService implements IMeteoDwdService {
    public function __construct(
        private IFileService $fileService,
        private string $meteoDwdBaseDir
    ) {
    }


    function readWindSpeedDirGrid(
        ForecastTime $forecastTime,
        GridDefinition $grid
    ): WindSpeedDirGrid {
        list($windValuesE, $windValuesN) = $this->readWindSpeedENValuesFromFile($forecastTime, $grid);

        $windSpeedDirValues = [];
        for ($y = 0; $y < $grid->height; $y++) {
            $lat = $grid->getLatByY($y);
            for ($x = 0; $x < $grid->width; $x++) {
                $lon = $grid->getLonByX($x);
                $pos = new Position2d($lon, $lat);
                $value_e = $windValuesE->interpolateByLonLat($pos);
                $value_n = $windValuesN->interpolateByLonLat($pos);
                $windSpeedDirValues[] = WindSpeedDir::fromSpeedEN($value_e, $value_n, SpeedUnit::KT);
            }
        }

        return new WindSpeedDirGrid($grid, $windSpeedDirValues);
    }


    function readWindSpeedENValuesFromFile(ForecastTime $forecastTime, GridDefinition $grid): array {
        $fileName = $this->meteoDwdBaseDir . "WIND_D2.meteobin"; // TODO
        $rawContent = $this->fileService->fileGetContents($fileName);

        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $e_values = [];
        $n_values = [];
        for ($y = 0; $y < $iconD2Grid->height; $y++) {
            for ($x = 0; $x < $iconD2Grid->width; $x++) {
                $idx = ($x + $y * $iconD2Grid->width) * 2;
                $e_values[] = $rawContent[$idx];
                $n_values[] = $rawContent[$idx + 1];
            }
        }

        $convertValueFn = function (string $binValue): float|null {
            return MeteoBinWindSpeedDirConverter::fromBinValue($binValue);
        };

        return [
            new ValueGrid($iconD2Grid, $e_values, $convertValueFn),
            new ValueGrid($iconD2Grid, $n_values, $convertValueFn)
        ];
    }
}
