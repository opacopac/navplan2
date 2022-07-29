<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;

use Navplan\Common\DomainModel\Position2d;


class AirportFeature {
    public function __construct(
        public string $type,
        public string $name,
        public ?Position2d $position
    ) {
    }
}
