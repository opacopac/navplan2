<?php declare(strict_types=1);

namespace Navplan\Airport\DomainModel;

use Navplan\Geometry\DomainModel\Position2d;


class AirportFeature {
    public function __construct(
        public string $type,
        public string $name,
        public ?Position2d $position
    ) {
    }
}
