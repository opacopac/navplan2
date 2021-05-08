<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Line2d;
use Navplan\Geometry\DomainModel\Position2d;


class Line2dConverter {
    public static function toRest(Line2d $line2d, ?int $roundToDigits = NULL): array {
        return array_map(
            function (Position2d $pos) use ($roundToDigits) { return Position2dConverter::toRest($pos, $roundToDigits); },
            $line2d->position2dList
        );
    }


    public static function multiLinetoRest(array $line2dList, ?int $roundToDigits = NULL): array {
        return array_map(
            function (Line2d $line2d) use ($roundToDigits) { return self::toRest($line2d, $roundToDigits); },
            $line2dList
        );
    }
}
