<?php declare(strict_types=1);

namespace Navplan\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Circle2d;


class Circle2dConverter {
    public static function toRest(Circle2d $circle): array {
        return array(
            "center" => $circle->center->toArray(),
            "radius" => LengthConverter::toRest($circle->radius),
        );
    }
}
