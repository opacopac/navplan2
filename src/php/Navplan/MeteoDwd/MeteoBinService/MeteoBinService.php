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
        $file = $this->fileService->fopen($fileName, "rb");

        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $e_values = [];
        $n_values = [];
        for ($y = 0; $y < $iconD2Grid->height; $y++) {
            $rawValues = $file->fread($iconD2Grid->width * 2);
            $byteValues = unpack("C*", $rawValues);
            $windENValues = MeteoBinWindSpeedDirConverter::fromBinValueList($byteValues);

            /*var_dump($windENValues);
            die;*/

            for ($x = 0; $x < $iconD2Grid->width; $x++) {
                $e_values[] = $windENValues[1 + $x * 2];
                $n_values[] = $windENValues[1 + $x * 2 + 1];
            }
        }

        $file->fclose();

        return [
            new ValueGrid($iconD2Grid, $e_values),
            new ValueGrid($iconD2Grid, $n_values)
        ];
    }
}
