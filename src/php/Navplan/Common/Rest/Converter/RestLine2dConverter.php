<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;


class RestLine2dConverter {
    public static function fromRest(array $args): Line2d {
        $posList = RestPosition2dConverter::fromRestList($args);

        return new Line2d($posList);
    }


    public static function toRest(Line2d $line2d, ?int $roundToDigits = NULL): array {
        return array_map(
            function (Position2d $pos) use ($roundToDigits) { return RestPosition2dConverter::toRest($pos, $roundToDigits); },
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
