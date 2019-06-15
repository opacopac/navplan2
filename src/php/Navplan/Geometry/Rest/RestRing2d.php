<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Ring2d;


class RestRing2d {
    public static function toRest(Ring2d $ring, ?int $roundToDigits = NULL): array {
        return array_map(
            function (Position2d $pos) use ($roundToDigits) { return RestPosition2d::toRest($pos, $roundToDigits); },
            $ring->position2dList
        );
    }
}
