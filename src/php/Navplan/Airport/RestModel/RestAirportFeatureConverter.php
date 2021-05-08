<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\AirportFeature;
use Navplan\Geometry\RestModel\Position2dConverter;


class RestAirportFeatureConverter {
    public static function toRest(AirportFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
            "pos" => $mapFeature->position ? Position2dConverter::toRest($mapFeature->position) : NULL
        );
    }
}
