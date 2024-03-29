<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\GridDefinition;
use Navplan\MeteoDwd\Domain\Model\IconGridDefinition;
use Navplan\MeteoDwd\Domain\Model\WeatherInfo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdWeatherRepo;
use Navplan\MeteoDwd\MeteoBin\Model\MeteoBinWeatherInfoConverter;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinWeatherRepo implements IMeteoDwdWeatherRepo {
    private const METEOBIN_WW_PATH = "/clct_precip/WW_D2.meteobin";

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . MeteoBinForecastRepo::ICON_D2_DIR;
    }


    public function readWeatherInfo(ForecastStep $forecastStep, GridDefinition $grid): array {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->runName . "/" . $step . self::METEOBIN_WW_PATH;

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
