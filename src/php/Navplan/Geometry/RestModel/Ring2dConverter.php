<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Ring2d;


class Ring2dConverter {
    public static function toRest(Ring2d $ring, ?int $roundToDigits = NULL): array {
        return array_map(
            function (Position2d $pos) use ($roundToDigits) { return Position2dConverter::toRest($pos, $roundToDigits); },
            $ring->position2dList
        );
    }
}
