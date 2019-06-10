<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;


class RestAltitude {
    public static function toRest(Altitude $alt, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $alt->value : round($alt->value, $roundToDigits),
            AltitudeUnit::toString($alt->unit),
            AltitudeReference::toString($alt->reference)
        ];
    }
}
