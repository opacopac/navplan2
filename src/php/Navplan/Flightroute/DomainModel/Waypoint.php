<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class Waypoint {
    public function __construct(
        public string $type,
        public string $frequency,
        public string $callsign,
        public string $checkpoint,
        public string $altitude,
        public bool $isMinAlt,
        public bool $isMaxAlt,
        public bool $isAltAtLegStart,
        public string $remark,
        public ?string $suppInfo,
        public Position2d $position,
        public ?string $airportIcao,
        public bool $isAlternate
    ) {
    }
}
