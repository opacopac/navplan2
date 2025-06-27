<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position2d;


class Airport {
    public function __construct(
        public int $id,
        public AirportType $type,
        public string $name,
        public ?string $icao,
        public string $country,
        public Position2d $position,
        public Altitude $elevation,
        public array $runways = [],
        public array $radios = [],
        public array $webcams = [],
        public array $charts = [],
        public array $charts2 = [],
        public array $mapfeatures = [],
    ) {
    }


    public function hasRadios(): bool {
        return count($this->radios) > 0;
    }


    public function hasRunways(): bool {
        return count($this->runways) > 0;
    }
}
