<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainService;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\Position2d;


interface IAdsbexRepo {
    public function readTraffic(Position2d $position, Length $radius): array;
}
