<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service;

use Navplan\Common\Domain\Model\Line2d;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;
use Navplan\VerticalMap\Domain\Model\VerticalMap;


interface IVerticalMapService {
    public function getRouteVerticalMap(Line2d $waypoints, ?ForecastStep $forecastStep, ?int $layer): VerticalMap;
}
