<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinVerticalCloudInfoConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinVerticalCloudRepo implements IMeteoForecastVerticalCloudRepo
{
    private const METEOBIN_VERTICAL_CLOUDS_PATH = "/vertical_clouds/VERTICAL_CLOUDS.meteobin";
    private const BYTES_PER_POS = 2;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoForecastConfig $meteoForecastConfig
    )
    {
    }


    public function readVerticalClouds(ForecastStep $forecastStep, array $posList): array
    {
        $gridDefinition = $forecastStep->modelConfig->gridDefinition;
        $file = $this->openMeteoBinFile($forecastStep);

        $bytesPerPos = self::BYTES_PER_POS * $forecastStep->modelConfig->vertLayers;
        $verticalCloudColumns = [];
        $horDist = Length::createZero();
        for ($i = 0; $i < count($posList); $i++) {
            if ($i > 0) {
                $horDist = $horDist->add(GeoHelper::calcHaversineDistance($posList[$i - 1], $posList[$i]));
            }
            $x = floor($gridDefinition->getX($posList[$i]->longitude));
            $y = floor($gridDefinition->getY($posList[$i]->latitude));
            $seekPos = (int)($gridDefinition->width * $y + $x) * $bytesPerPos;
            if ($file->fseek($seekPos) === 0) {
                $rawBytes = $file->fread($bytesPerPos);
                $verticalCloudColumns[] = MeteoBinVerticalCloudInfoConverter::verticalCloudColumnFrom($rawBytes, $horDist);
            };
        }

        return $verticalCloudColumns;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile
    {
        $fileName = $this->meteoForecastConfig->getMeteoForecastBaseDir()
            . $forecastStep->modelConfig->baseDir
            . $forecastStep->runName
            . "/"
            . StringNumberHelper::zeroPad($forecastStep->step, 3)
            . self::METEOBIN_VERTICAL_CLOUDS_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
