<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Service;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\IconGridDefinition;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdPrecipRepo;
use Navplan\MeteoDwd\Domain\Service\ReadCloudMeteogramRequest;
use Navplan\MeteoDwd\MeteoBin\Model\MeteoBinPrecipConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinPrecipRepo implements IMeteoDwdPrecipRepo {
    private const METEOBIN_PRECIP_PATH = "/clct_precip/PRECIP_D2.meteobin";
    private const BYTES_PER_POS = 1;

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig,
    ) {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . MeteoBinForecastRepo::ICON_D2_DIR;
    }


    public function readPrecip(ForecastStep $forecastStep, array $posList): array {
        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $file = $this->openMeteoBinFile($forecastStep);

        $precipMmPerHour = [];
        for ($i = 0; $i < count($posList); $i++) {
            $x = floor($iconD2Grid->getX($posList[$i]->longitude));
            $y = floor($iconD2Grid->getY($posList[$i]->latitude));
            $seekPos = (int) ($iconD2Grid->width * $y + $x) * self::BYTES_PER_POS;
            if ($file->fseek($seekPos) === 0) {
                $rawByte = $file->fread(self::BYTES_PER_POS);
                $precipMmPerHour[] = MeteoBinPrecipConverter::precipFrom($rawByte);
            };
        }

        return $precipMmPerHour;
    }


    public function readMeteoGramPrecip(ReadCloudMeteogramRequest $request): array {
        $precipMmPerHour = [];
        for ($i = $request->minStep; $i <= $request->maxStep; $i++) {
            $forecastStep = new ForecastStep($request->fcName, $i);
            $singlePrecip = $this->readPrecip($forecastStep, [$request->pos]);
            if (count($singlePrecip) > 0) {
                $precipMmPerHour = $singlePrecip[0];
            }
        }

        return $precipMmPerHour;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->runName . "/" . $step . self::METEOBIN_PRECIP_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
