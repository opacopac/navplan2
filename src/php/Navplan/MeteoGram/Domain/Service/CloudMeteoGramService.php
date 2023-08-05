<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;
use Navplan\Terrain\Domain\Service\ITerrainService;


class CloudMeteoGramService implements ICloudMeteoGramService  {
    public function __construct(
        private readonly IMeteoDwdVerticalCloudRepo $verticalCloudRepo,
        private readonly ITerrainService $terrainService
    ) {
    }


    public function readCloudMeteoGram(ReadCloudMeteogramRequest $request): ReadCloudMeteogramResponse {
        $cloudMeteogramSteps = [];
        for ($i = $request->minStep; $i <= $request->maxStep; $i++) {
            $forecastStep = new ForecastStep($request->fcName, $i);
            $singleVerticalCloudColumn = $this->verticalCloudRepo->readVerticalClouds($forecastStep, [$request->pos]);
            if (count($singleVerticalCloudColumn) > 0) {
                $verticalCloudColumn = $singleVerticalCloudColumn[0];
                $cloudMeteogramSteps[] = new CloudMeteogramStep($forecastStep->step, $verticalCloudColumn->cloudLevels);
            }
        }

        $altitude = $this->terrainService->readElevations([$request->pos])[0]->altitude;

        return new ReadCloudMeteogramResponse($altitude->getHeightAmsl(), $cloudMeteogramSteps);
    }
}
