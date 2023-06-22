<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Domain\Model;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;


class SmaStation {
    public function __construct(
        public string $id,
        public string $name,
        public Position2d $position,
        public Altitude $altitude
    ) {
    }
}
