<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Circle2d;


class Circle2dRest {
    public static function toArray(Circle2d $circle): array {
        return array(
            "center" => $circle->center->toArray(),
            "radius" => LengthRest::toArray($circle->radius),
        );
    }
}
