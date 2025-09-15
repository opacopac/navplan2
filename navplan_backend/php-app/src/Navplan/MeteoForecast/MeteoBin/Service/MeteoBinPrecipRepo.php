<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinPrecipConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinPrecipRepo implements IMeteoForecastPrecipRepo
{
    private const METEOBIN_PRECIP_PATH = "/clct_precip/PRECIP.meteobin";
    private const BYTES_PER_POS = 1;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoForecastConfig $meteoForecastConfig,
    )
    {
    }


    public function readPrecip(ForecastStep $forecastStep, array $posList): array
    {
        $gridDefinition = $forecastStep->modelConfig->gridDefinition;
        $file = $this->openMeteoBinFile($forecastStep);

        $precipMmPerHour = [];
        for ($i = 0; $i < count($posList); $i++) {
            $x = floor($gridDefinition->getX($posList[$i]->longitude));
            $y = floor($gridDefinition->getY($posList[$i]->latitude));
            $seekPos = (int)($gridDefinition->width * $y + $x) * self::BYTES_PER_POS;
            if ($file->fseek($seekPos) === 0) {
                $rawByte = $file->fread(self::BYTES_PER_POS);
                $precipMmPerHour[] = MeteoBinPrecipConverter::precipFrom($rawByte);
            };
        }

        return $precipMmPerHour;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile
    {
        $fileName = $this->meteoForecastConfig->getMeteoForecastBaseDir()
            . $forecastStep->modelConfig->baseDir
            . $forecastStep->runName
            . "/"
            . StringNumberHelper::zeroPad($forecastStep->step, 3)
            . self::METEOBIN_PRECIP_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
