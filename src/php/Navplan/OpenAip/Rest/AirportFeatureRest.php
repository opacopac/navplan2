<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\MapFeature;


class AirportFeatureRest {
    public static function toArray(MapFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
        );
    }
}
