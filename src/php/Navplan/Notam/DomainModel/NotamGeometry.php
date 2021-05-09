<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\IGeometry2d;


class NotamGeometry {
    public function __construct(
        public IGeometry2d $shape,
        public ?Altitude $bottomAltitude,
        public ?Altitude $topAltitude
    ) {
    }
}
