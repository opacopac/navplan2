<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class AirportChart {
    public function __construct(
        public int $id,
        public string $airportIcao,
        public string $source,
        public string $type,
        public string $filename,
        public int $mercator_n,
        public int $mercator_s,
        public int $mercator_e,
        public int $mercator_w
    ) {
    }
}
