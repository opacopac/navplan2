<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinService;

use Navplan\Common\GeoHelper;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastStep;
use Navplan\MeteoDwd\DomainModel\IconGridDefinition;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\MeteoBinModel\MeteoBinVerticalCloudInfoConverter;
use Navplan\System\DomainModel\IFile;
use Navplan\System\DomainService\IFileService;


class MeteoBinVerticalCloudService implements IMeteoDwdVerticalCloudService  {
    private const METEOBIN_VERTICAL_CLOUDS_PATH = "/vertical_clouds/VERTICAL_CLOUDS_D2.meteobin"; // TODO: config
    private const BYTES_PER_POS = 41 * 2; // TODO: config

    private string $iconD2BaseDir;


    public function __construct(
        private IFileService $fileService,
        private string $meteoDwdBaseDir
    ) {
        $this->iconD2BaseDir = $this->meteoDwdBaseDir . MeteoBinForecastService::ICON_D2_DIR;
    }


    public function readVerticalCloudInfo(ForecastStep $forecastStep, array $posList): array {
        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $file = $this->openMeteoBinFile($forecastStep);

        $verticalCloudColumns = [];
        for ($i = 0; $i < count($posList); $i++) {
            $x = floor($iconD2Grid->getX($posList[$i]->longitude));
            $y = floor($iconD2Grid->getY($posList[$i]->latitude));
            $seekPos = (int) ($iconD2Grid->width * $y + $x) * self::BYTES_PER_POS;
            if ($file->fseek($seekPos) === 0) {
                $rawBytes = $file->fread(self::BYTES_PER_POS);
                $horDist = GeoHelper::calcHaversineDistance($posList[0], $posList[$i]);
                $verticalCloudColumns[] = MeteoBinVerticalCloudInfoConverter::verticalCloudColumnFrom($rawBytes, $horDist);
            };
        }

        return $verticalCloudColumns;
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->run . "/" . $step . self::METEOBIN_VERTICAL_CLOUDS_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
