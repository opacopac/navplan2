<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;


class Airport {
    public function __construct(
        public int $id,
        public string $type,
        public string $name,
        public ?string $icao,
        public string $country,
        public Position2d $position,
        public Length $elevation,
        public array $runways,
        public array $radios,
        public array $webcams,
        public array $charts,
        public array $charts2,
        public array $mapfeatures
    ) {
    }
}
