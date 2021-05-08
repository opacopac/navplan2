<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Extent;


class Extent2dConverter {
    public static function toRest(Extent $extent, ?int $roundToDigits = NULL): array {
        return [
            Position2dConverter::toRest($extent->minPos, $roundToDigits),
            Position2dConverter::toRest($extent->maxPos, $roundToDigits)
        ];
    }
}
