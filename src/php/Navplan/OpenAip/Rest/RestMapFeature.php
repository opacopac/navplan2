<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\OpenAip\Domain\MapFeature;


class RestMapFeature {
    public static function toRest(MapFeature $mapFeature): array {
        return array(
            "type" => $mapFeature->type,
            "name" => $mapFeature->name,
            "pos" => $mapFeature->position ? RestPosition2d::toRest($mapFeature->position) : NULL
        );
    }
}
