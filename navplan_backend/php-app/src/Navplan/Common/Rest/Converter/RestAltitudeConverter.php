<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\StringNumberHelper;


class RestAltitudeConverter {
    public static function toRest(?Altitude $alt, ?int $roundToDigits = NULL): ?array {
        if (!$alt) {
            return NULL;
        }

        return [
            $roundToDigits === NULL ? $alt->value : round($alt->value, $roundToDigits),
            $alt->unit->value,
            $alt->reference->value
        ];
    }


    public static function fromRest(?array $args): ?Altitude {
        if (!$args) {
            return NULL;
        }

        return new Altitude(
            StringNumberHelper::parseFloatOrError($args, 0),
            AltitudeUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
            AltitudeReference::from(StringNumberHelper::parseStringOrError($args, 2)),
        );
    }
}
