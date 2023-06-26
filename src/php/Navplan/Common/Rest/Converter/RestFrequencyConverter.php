<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\Common\StringNumberHelper;


class RestFrequencyConverter {
    public static function toRest(?Frequency $frequency): ?array {
        if (!$frequency) {
            return null;
        }

        return [
            $frequency->value,
            $frequency->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Frequency {
        if (!$args) {
            return null;
        }

        return new Frequency(
            StringNumberHelper::parseFloatOrError($args, 0),
            FrequencyUnit::from(StringNumberHelper::parseStringOrError($args, 1))
        );
    }
}
