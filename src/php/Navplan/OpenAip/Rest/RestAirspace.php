<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestAltitude;
use Navplan\OpenAip\Domain\Airspace;


class RestAirspace {
    public static function toArray(Airspace $airspace): array {
        return array(
            "id" => $airspace->id,
            "aip_id" => $airspace->aip_id,
            "category" => $airspace->category,
            "country" => $airspace->country,
            "name" => $airspace->name,
            "alt_top" => RestAltitude::toRest($airspace->alt_top),
            "alt_bottom" => RestAltitude::toRest($airspace->alt_bottom),
            "polygon" => $airspace->polygon->toArray()
        );
    }
}
