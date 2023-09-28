<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;

use Navplan\Common\Domain\Model\Extent2d;


class AirportChart2 {
    public function __construct(
        public int $id,
        public string $airportIcao,
        public string $source,
        public string $type,
        public string $filename,
        public Extent2d $extent
    ) {
    }
}
