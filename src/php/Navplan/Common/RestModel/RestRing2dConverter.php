<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Ring2d;


class RestRing2dConverter {
    public static function toRest(?Ring2d $ring, ?int $roundToDigits = NULL): ?array {
        if (!$ring) {
            return NULL;
        }

        return array_map(
            function (Position2d $pos) use ($roundToDigits) { return RestPosition2dConverter::toRest($pos, $roundToDigits); },
            $ring->position2dList
        );
    }
}
