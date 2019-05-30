<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;


class RestLength {
    public static function toArray(Length $length): array {
        return [
            $length->value,
            LengthUnit::toString($length->unit),
        ];
    }
}
