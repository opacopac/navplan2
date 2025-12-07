<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinTempConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


readonly class MeteoBinTempRepo implements IMeteoForecastTempRepo
{
    private const string METEOBIN_TEMP_PATH = "/temp/TEMP.meteobin";
    private const int BYTES_PER_POS = 1;


    public function __construct(
        private IFileService $fileService,
        private IMeteoForecastConfig $meteoForecastConfig,
    )
    {
    }


    public function readTemp(ForecastStep $forecastStep, array $posList): array
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
                $precipMmPerHour[] = MeteoBinTempConverter::tempFrom($rawByte);
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
            . self::METEOBIN_TEMP_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
