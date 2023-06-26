<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Circle2d;


class RestCircle2dConverter {
    public static function toRest(Circle2d $circle): array {
        return array(
            "center" => $circle->center->toArray(),
            "radius" => RestLengthConverter::toRest($circle->radius),
        );
    }
}
