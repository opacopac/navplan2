<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestModel;

use Navplan\Aerodrome\DomainModel\AirportFeature;
use Navplan\Common\RestModel\RestPosition2dConverter;


class RestAirportFeatureConverter {
    public static function toRest(AirportFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
            "pos" => $mapFeature->position ? RestPosition2dConverter::toRest($mapFeature->position) : NULL
        );
    }
}
