<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\IGeometry2d;


class NotamGeometry {
    public function __construct(
        public IGeometry2d $shape,
        public ?Altitude $bottomAltitude,
        public ?Altitude $topAltitude
    ) {
    }
}
