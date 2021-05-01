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


    public static function fromFtAmsl(float $ftAmsl) : Altitude {
        return new Altitude(
            $ftAmsl,
            AltitudeUnit::FT,
            AltitudeReference::MSL
        );
    }


    public static function fromFtAgl(float $ftAgl) : Altitude {
        return new Altitude(
            $ftAgl,
            AltitudeUnit::FT,
            AltitudeReference::GND
        );
    }


    public static function fromMtAmsl(float $mtAmsl) : Altitude {
        return new Altitude(
            $mtAmsl,
            AltitudeUnit::M,
            AltitudeReference::MSL
        );
    }


    public static function fromFl(float $flightLevel) : Altitude {
        return new Altitude(
            $flightLevel,
            AltitudeUnit::FL,
            AltitudeReference::STD
        );
    }
}
