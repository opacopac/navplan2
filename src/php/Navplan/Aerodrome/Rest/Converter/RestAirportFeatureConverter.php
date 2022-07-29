<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;


class RestAirportFeatureConverter {
    public static function toRest(AirportFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
            "pos" => $mapFeature->position ? RestPosition2dConverter::toRest($mapFeature->position) : NULL
        );
    }
}
