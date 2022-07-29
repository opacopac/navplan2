<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;


class AirportCircuit {
    public function __construct(
        public string $airportIcao,
        public string $section, // e.g. SID, STAR, etc.
        public string $name, // e.g. VFR LSZB APP, VFR LSGE, etc.
        public ?string $comment, // e.g. LSZB Cirquit LH
        public array $line2dList // array of Line2d
    ) {
    }
}
