<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdPrecipRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Model\CloudMeteogram;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;
use Navplan\Terrain\Domain\Service\ITerrainService;


class CloudMeteoGramService implements ICloudMeteoGramService  {
    public function __construct(
        private readonly IMeteoDwdVerticalCloudRepo $verticalCloudRepo,
        private readonly IMeteoDwdPrecipRepo $precipRepo,
        private readonly ITerrainService $terrainService
    ) {
    }


    public function readCloudMeteoGram(ReadCloudMeteogramRequest $request): CloudMeteogram {
        $cloudMeteogramSteps = [];
        for ($i = $request->minStep; $i <= $request->maxStep; $i++) {
            $forecastStep = new ForecastStep($request->fcName, $i);

            $singleVerticalCloudColumn = $this->verticalCloudRepo->readVerticalClouds($forecastStep, [$request->pos]);
            $verticalCloudColumn = count($singleVerticalCloudColumn) > 0 ? $singleVerticalCloudColumn[0] : [];

            $singlePrecip = $this->precipRepo->readPrecip($forecastStep, [$request->pos]);
            $precipMmPerHour = count($singlePrecip) > 0 ? $singlePrecip[0] : 0;

            $cloudMeteogramSteps[] = new CloudMeteogramStep(
                $forecastStep->step,
                $verticalCloudColumn->cloudLevels,
                $precipMmPerHour
            );
        }

        $altitude = $this->terrainService->readElevations([$request->pos])[0]->altitude;

        return new CloudMeteogram($altitude->getHeightAmsl(), $cloudMeteogramSteps);
    }
}
