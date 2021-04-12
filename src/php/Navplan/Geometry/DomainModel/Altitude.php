<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;

use InvalidArgumentException;


class Altitude {
    public function __construct(
        public float $value,
        public int $unit,
        public int $reference
    ) {
        if ($unit === AltitudeUnit::FL && $reference !== AltitudeReference::STD) {
            throw new InvalidArgumentException('unit FL requires reference STD');
        }

        if ($reference === AltitudeReference::STD && $unit !== AltitudeUnit::FL) {
            throw new InvalidArgumentException('reference STD requires unit FL');
        }
    }
}
