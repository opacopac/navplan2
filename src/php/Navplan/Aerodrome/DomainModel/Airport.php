<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;


class Airport {
    public function __construct(
        public int $id,
        public AirportType $type,
        public string $name,
        public ?string $icao,
        public string $country,
        public Position2d $position,
        public Altitude $elevation,
        public array $runways,
        public array $radios,
        public array $webcams,
        public array $charts,
        public array $charts2,
        public array $mapfeatures
    ) {
    }
}
