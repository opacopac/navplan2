<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;


class Altitude {
    const FL_TO_FT_FACTOR = 100;


    public function __construct(
        public float $value,
        public AltitudeUnit $unit,
        public AltitudeReference $reference
    ) {
        if ($this->unit === AltitudeUnit::FL && $this->reference !== AltitudeReference::STD) {
            throw new InvalidArgumentException('unit FL requires reference STD');
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


    public function getHeightAmsl(Length $terrainElevation = NULL): Length {
        if ($terrainElevation === NULL) {
            $terrainElevation = Length::createZero();
        }

        $unit = match ($this->unit) {
            AltitudeUnit::M => LengthUnit::M,
            AltitudeUnit::FT, AltitudeUnit::FL => LengthUnit::FT,
            default => throw new InvalidArgumentException('AltitudeUnit ' . $this->unit->value . ' not supported!'),
        };

        return match ($this->reference) {
            AltitudeReference::MSL => new Length($this->value, $unit),
            AltitudeReference::GND => new Length($this->value + $terrainElevation->getValue($unit), $unit),
            AltitudeReference::STD => new Length($this->value * self::FL_TO_FT_FACTOR, $unit),
            default => throw new InvalidArgumentException('AltitudeReference ' . $this->reference->value . ' not supported!'),
        };
    }
}
