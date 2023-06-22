<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Service;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\GeoHelper;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\IconGridDefinition;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdConfig;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\Domain\Service\ReadPosVerticalCloudsRequest;
use Navplan\MeteoDwd\Domain\Service\ReadPosVerticalCloudsResponse;
use Navplan\MeteoDwd\MeteoBin\Model\MeteoBinVerticalCloudInfoConverter;
use Navplan\System\DomainModel\IFile;
use Navplan\System\DomainService\IFileService;


class MeteoBinVerticalCloudService implements IMeteoDwdVerticalCloudService  {
    private const METEOBIN_VERTICAL_CLOUDS_PATH = "/vertical_clouds/VERTICAL_CLOUDS_D2.meteobin";
    private const BYTES_PER_POS = 41 * 2;

    private string $iconD2BaseDir;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IMeteoDwdConfig $meteoDwdConfig
    ) {
        $this->iconD2BaseDir = $this->meteoDwdConfig->getMeteoDwdBaseDir() . MeteoBinForecastService::ICON_D2_DIR;
    }


    public function readVerticalClouds(ForecastStep $forecastStep, array $posList): array {
        $iconD2Grid = IconGridDefinition::getIconD2Grid();
        $file = $this->openMeteoBinFile($forecastStep);

        $verticalCloudColumns = [];
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
                $verticalCloudColumns[] = MeteoBinVerticalCloudInfoConverter::verticalCloudColumnFrom($rawBytes, $horDist);
            };
        }

        return $verticalCloudColumns;
    }


    public function readPositionalVerticalClouds(ReadPosVerticalCloudsRequest $request): ReadPosVerticalCloudsResponse {
        $forecastRun = $request->forecastRun;
        $pos = $request->pos;

        $verticalCloudColumns = [];
        for ($i = $forecastRun->modelConfig->minStep; $i <= $forecastRun->modelConfig->maxStep; $i++) {
            $forecastStep = new ForecastStep($forecastRun->getName(), $i);
            $singleVerticalCloudColumn = $this->readVerticalClouds($forecastStep, [$pos]);
            if (count($singleVerticalCloudColumn) > 0) {
                $verticalCloudColumns[] = $singleVerticalCloudColumn[0];
            }
        }

        return new ReadPosVerticalCloudsResponse($verticalCloudColumns);
    }


    private function openMeteoBinFile(ForecastStep $forecastStep): IFile {
        $step = StringNumberHelper::zeroPad($forecastStep->step, 3);
        $fileName = $this->iconD2BaseDir . $forecastStep->runName . "/" . $step . self::METEOBIN_VERTICAL_CLOUDS_PATH;

        return $this->fileService->fopen($fileName, "r");
    }
}
