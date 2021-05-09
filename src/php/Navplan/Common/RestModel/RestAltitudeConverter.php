<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;


class RestAltitudeConverter {
    public static function toRest(Altitude $alt, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $alt->value : round($alt->value, $roundToDigits),
            AltitudeUnit::toString($alt->unit),
            AltitudeReference::toString($alt->reference)
        ];
    }
}
