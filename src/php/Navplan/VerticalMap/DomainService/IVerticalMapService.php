<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainService;

use Navplan\Common\DomainModel\Line2d;
use Navplan\VerticalMap\DomainModel\VerticalMap;


interface IVerticalMapService {
    public function getRouteVerticalMap(Line2d $waypoints): VerticalMap;
}
