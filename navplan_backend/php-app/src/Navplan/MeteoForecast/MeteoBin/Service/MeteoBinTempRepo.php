<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Service;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoForecast\Domain\Model\ForecastStep;
use Navplan\MeteoForecast\Domain\Model\IconGridDefinition;
use Navplan\MeteoForecast\Domain\Model\WeatherModelIconD2;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\MeteoBin\Model\MeteoBinTempConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinTempRepo implements IMeteoForecastTempRepo
{
    private const METEOBIN_TEMP_PATH = "/temp/TEMP_D2.meteobin";
    private const BYTES_PER_POS = 1;

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoForecastConfig $meteoForecastConfig,
    )
    {
        $this->iconD2BaseDir = $this->meteoForecastConfig->getMeteoForecastBaseDir() . WeatherModelIconD2::FORECAST_DIR;
    }


    public function readTemp(ForecastStep $forecastStep, array $posList): array
    {
        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $file = $this->openMeteoBinFile($forecastStep);

        $precipMmPerHour = [];
        for ($i = 0; $i < count($posList); $i++) {
            $x = floor($iconD2Grid->getX($posList[$i]->longitude));
            $y = floor($iconD2Grid->getY($posList[$i]->latitude));
            $seekPos = (int)($iconD2Grid->width * $y + $x) * self::BYTES_PER_POS;
            if ($file->fseek($seekPos) === 0) {
                $rawByte = $file->fread(self::BYTES_PER_POS);
                $precipMmPerHour[] = MeteoBinTempConverter::tempFrom($rawByte);
            };
        }

        return $precipMmPerHour;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile
    {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->runName . "/" . $step . self::METEOBIN_TEMP_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
