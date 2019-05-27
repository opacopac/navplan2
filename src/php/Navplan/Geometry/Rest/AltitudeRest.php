<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;


class AltitudeRest {
    public static function toArray(Altitude $alt): array {
        return array(
            "value" => $alt->value,
            "unit" => self::getUnitValue($alt->unit),
            "ref" => self::getRefValue($alt->reference)
        );
    }


    private static function getUnitValue(int $unit): string {
        switch ($unit) {
            case AltitudeUnit::M : return "M";
            case AltitudeUnit::FT : return "FT";
            case AltitudeUnit::FL : return "FL";
            default : throw new InvalidArgumentException('invalid altitude unit: ' . $unit);
        }
    }


    private static function getRefValue(int $ref): string {
        switch ($ref) {
            case AltitudeReference::GND : return "GND";
            case AltitudeReference::MSL : return "MSL";
            case AltitudeReference::STD : return "STD";
            default : throw new InvalidArgumentException('invalid altitude reference: ' . $ref);
        }
    }
}
