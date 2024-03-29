<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\IconGridDefinition;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindRepo;
use Navplan\MeteoDwd\MeteoBin\Model\MeteoBinVerticalWindInfoConverter;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;


class MeteoBinVerticalWindRepo implements IMeteoDwdVerticalWindRepo  {
    private const METEOBIN_VERTICAL_WIND_PATH = "/vertical_wind/VERTICAL_WIND_D2.meteobin";
    private const BYTES_PER_POS = 41 * 3;

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . MeteoBinForecastRepo::ICON_D2_DIR;
    }


    public function readVerticalWindInfo(ForecastStep $forecastStep, array $posList): array {
        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $file = $this->openMeteoBinFile($forecastStep);

        $verticalWindColumns = [];
        $horDist = Length::createZero();
        for ($i = 0; $i < count($posList); $i++) {
            if ($i > 0) {
                $horDist = $horDist->add(GeoHelper::calcHaversineDistance($posList[$i - 1], $posList[$i]));
            }
            $x = floor($iconD2Grid->getX($posList[$i]->longitude));
            $y = floor($iconD2Grid->getY($posList[$i]->latitude));
            $seekPos = (int) ($iconD2Grid->width * $y + $x) * self::BYTES_PER_POS;
            if ($file->fseek($seekPos) === 0) {
                $rawBytes = $file->fread(self::BYTES_PER_POS);
                $verticalWindColumns[] = MeteoBinVerticalWindInfoConverter::verticalWindColumnFrom($rawBytes, $horDist);
            };
        }

        return $verticalWindColumns;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->runName . "/" . $step . self::METEOBIN_VERTICAL_WIND_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
