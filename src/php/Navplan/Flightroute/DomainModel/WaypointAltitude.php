<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainModel;

use Navplan\Common\DomainModel\Altitude;


class WaypointAltitude {
    public function __construct(
        public Altitude $altitude,
        public bool $isMinAlt,
        public bool $isMaxAlt,
        public bool $isAltAtLegStart,
    ) {
    }
}
