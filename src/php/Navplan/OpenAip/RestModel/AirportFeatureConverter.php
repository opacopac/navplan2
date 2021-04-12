<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\OpenAip\DomainModel\MapFeature;


class AirportFeatureConverter {
    public static function toRest(MapFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
            "pos" => $mapFeature->position ? Position2dConverter::toRest($mapFeature->position) : NULL
        );
    }
}
