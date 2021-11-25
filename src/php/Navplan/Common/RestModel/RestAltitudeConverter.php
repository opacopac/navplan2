<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\StringNumberHelper;


class RestAltitudeConverter {
    public static function toRest(?Altitude $alt, ?int $roundToDigits = NULL): ?array {
        if (!$alt) {
            return NULL;
        }

        return [
            $roundToDigits === NULL ? $alt->value : round($alt->value, $roundToDigits),
            AltitudeUnit::toString($alt->unit),
            AltitudeReference::toString($alt->reference)
        ];
    }


    public static function fromRest(?array $args): ?Altitude {
        if (!$args) {
            return NULL;
        }

        return new Altitude(
            StringNumberHelper::parseFloatOrError($args, 0),
            AltitudeUnit::fromString(StringNumberHelper::parseStringOrError($args, 1)),
            AltitudeReference::fromString(StringNumberHelper::parseStringOrError($args, 2)),
        );
    }
}
