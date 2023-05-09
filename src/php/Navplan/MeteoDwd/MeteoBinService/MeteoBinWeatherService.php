<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\GridDefinition;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainModel\WeatherInfo;
use Navplan\MeteoDwd\DomainService\IMeteoDwdConfigService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdWeatherService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinWeatherInfoConverter;
use Navplan\System\DomainService\IFileService;


class MeteoBinWeatherService implements IMeteoDwdWeatherService {
    private const METEOBIN_WW_PATH = "/clct_precip/WW_D2.meteobin";

    private string $iconD2BaseDir;


    public function __construct(
        private IFileService $fileService,
        private IMeteoDwdConfigService $configService
    ) {
        $this->iconD2BaseDir = $this->configService->getMeteoDwdBaseDir() . MeteoBinForecastService::ICON_D2_DIR;
    }


    public function readWeatherInfo(ForecastStep $forecastStep, GridDefinition $grid): array {
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

                    $wwValue = MeteoBinWeatherInfoConverter::wwFromBinValue($rawContent[$icon_idx]);
                    $ceiling = MeteoBinWeatherInfoConverter::ceilingFtFromBinValue($rawContent[$icon_idx + 1]);

                    if ($wwValue !== null) {
                        $wwValues[] = new WeatherInfo($wwValue, $ceiling, $pos);
                    }
                }
            }
        }

        return $wwValues;
    }
}
