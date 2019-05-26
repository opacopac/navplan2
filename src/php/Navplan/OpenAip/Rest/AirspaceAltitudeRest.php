<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\AirspaceAltitude;


class AirspaceAltitudeRest {
    public static function toArray(AirspaceAltitude $alt): array {
        return array(
            "ref" => $alt->reference,
            "height" => $alt->height,
            "unit" => $alt->unit,
        );
    }
}
