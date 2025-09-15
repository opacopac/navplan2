<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinVerticalWindInfoConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinVerticalWindRepo implements IMeteoForecastVerticalWindRepo
{
    private const METEOBIN_VERTICAL_WIND_PATH = "/vertical_wind/VERTICAL_WIND.meteobin";
    private const BYTES_PER_POS = 3;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoForecastConfig $meteoForecastConfig
    )
    {
    }


    public function readVerticalWindInfo(ForecastStep $forecastStep, array $posList): array
    {
        $iconD2Grid = $forecastStep->modelConfig;
        $file = $this->openMeteoBinFile($forecastStep);

        $bytesPerPos = self::BYTES_PER_POS * $forecastStep->modelConfig->vertLayers;
        $verticalWindColumns = [];
        $horDist = Length::createZero();
        for ($i = 0; $i < count($posList); $i++) {
            if ($i > 0) {
                $horDist = $horDist->add(GeoHelper::calcHaversineDistance($posList[$i - 1], $posList[$i]));
            }
            $x = floor($iconD2Grid->getX($posList[$i]->longitude));
            $y = floor($iconD2Grid->getY($posList[$i]->latitude));
            $seekPos = (int)($iconD2Grid->width * $y + $x) * $bytesPerPos;
            if ($file->fseek($seekPos) === 0) {
                $rawBytes = $file->fread($bytesPerPos);
                $verticalWindColumns[] = MeteoBinVerticalWindInfoConverter::verticalWindColumnFrom($rawBytes, $horDist);
            };
        }

        return $verticalWindColumns;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile
    {
        $fileName = $this->meteoForecastConfig->getMeteoForecastBaseDir()
            . $forecastStep->modelConfig->baseDir
            . $forecastStep->runName
            . "/"
            . StringNumberHelper::zeroPad($forecastStep->step, 3)
            . self::METEOBIN_VERTICAL_WIND_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
