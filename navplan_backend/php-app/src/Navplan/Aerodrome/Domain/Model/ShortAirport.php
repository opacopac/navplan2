<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;

use Navplan\Common\Domain\Model\Position2d;


class ShortAirport {
    public function __construct(
        public int $id,
        public string $type,
        public ?string $icao,
        public Position2d $position,
        public ?int $rwy1dir,
        public ?string $rwy1sfc,
        public array $featureTypes
    ) {
    }
}
