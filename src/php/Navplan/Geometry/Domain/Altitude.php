<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class Altitude {
    public $value;
    public $unit;
    public $reference;


    public function __construct(
        float $value,
        int $unit,
        int $reference
    ) {
        if ($unit === AltitudeUnit::FL && $reference !== AltitudeReference::STD) {
            throw new InvalidArgumentException('unit FL requires reference STD');
        }

        if ($reference === AltitudeReference::STD && $unit !== AltitudeUnit::FL) {
            throw new InvalidArgumentException('reference STD requires unit FL');
        }

        $this->value = $value;
        $this->unit = $unit;
        $this->reference = $reference;
    }
}
