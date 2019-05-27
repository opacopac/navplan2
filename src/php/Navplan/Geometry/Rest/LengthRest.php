<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;


class LengthRest {
    public static function toArray(Length $length): array {
        return array(
            "value" => $length->value,
            "unit" => self::getUnitString($length->unit),
        );
    }


    private static function getUnitString(int $unit): string {
        switch ($unit) {
            case LengthUnit::M : return "M";
            case LengthUnit::FT : return "FT";
            case LengthUnit::NM : return "NM";
            default : throw new InvalidArgumentException('invalid length unit: ' . $unit);
        }
    }
}
