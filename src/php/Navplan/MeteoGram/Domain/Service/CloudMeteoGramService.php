<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdPrecipRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdTempRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Model\CloudMeteogram;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;
use Navplan\Terrain\Domain\Service\ITerrainService;


class CloudMeteoGramService implements ICloudMeteoGramService  {
    public function __construct(
        private readonly IMeteoDwdVerticalCloudRepo $verticalCloudRepo,
        private readonly IMeteoDwdPrecipRepo $precipRepo,
        private readonly IMeteoDwdTempRepo $tempRepo,
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
            $precipPerHour = count($singlePrecip) > 0 ? $singlePrecip[0] : Length::fromM(0);

            $singleTemp = $this->tempRepo->readTemp($forecastStep, [$request->pos]);
            $temp = count($singleTemp) > 0 ? new Temperature($singleTemp[0], TemperatureUnit::C) : null;

            $cloudMeteogramSteps[] = new CloudMeteogramStep(
                $forecastStep->step,
                $verticalCloudColumn->cloudLevels,
                $precipPerHour,
                $temp
            );
        }

        $altitude = $this->terrainService->readElevations([$request->pos])[0]->altitude;

        return new CloudMeteogram($altitude->getHeightAmsl(), $cloudMeteogramSteps);
    }
}
