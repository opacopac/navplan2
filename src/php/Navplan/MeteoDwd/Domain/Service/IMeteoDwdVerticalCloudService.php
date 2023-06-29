<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoDwd\Domain\Model\CloudMeteogramStep;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumn;


interface IMeteoDwdVerticalCloudService {
    /**
     * @param ForecastStep $forecastStep
     * @param Position2d[] $posList
     * @return VerticalCloudColumn[]
     */
    function readVerticalClouds(ForecastStep $forecastStep, array $posList): array;

    /**
     * @param ReadCloudMeteogramRequest $request
     * @return CloudMeteogramStep[]
     */
    function readCloudMeteoGramSteps(ReadCloudMeteogramRequest $request): array;
}
