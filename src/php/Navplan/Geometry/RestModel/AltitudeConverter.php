<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;


class AltitudeConverter {
    public static function toRest(Altitude $alt, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $alt->value : round($alt->value, $roundToDigits),
            AltitudeUnit::toString($alt->unit),
            AltitudeReference::toString($alt->reference)
        ];
    }
}
