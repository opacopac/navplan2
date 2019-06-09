<?php declare(strict_types=1);

namespace Navplan\Geometry\Rest;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;


class RestAltitude {
    public static function toRest(Altitude $alt): array {
        return [
            $alt->value,
            AltitudeUnit::toString($alt->unit),
            AltitudeReference::toString($alt->reference)
        ];
    }
}
