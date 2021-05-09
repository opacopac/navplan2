<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Circle2d;


class RestCircle2dConverter {
    public static function toRest(Circle2d $circle): array {
        return array(
            "center" => $circle->center->toArray(),
            "radius" => RestLengthConverter::toRest($circle->radius),
        );
    }
}
