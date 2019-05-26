<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Airspace;


class AirspaceRest {
    public static function toArray(Airspace $airspace): array {
        return array(
            "id" => $airspace->id,
            "aip_id" => $airspace->aip_id,
            "category" => $airspace->category,
            "country" => $airspace->country,
            "name" => $airspace->name,
            "alt" => array( // TODO: replace by alt_bottom, alt_top
                "top" => AirspaceAltitudeRest::toArray($airspace->alt_top),
                "bottom" => AirspaceAltitudeRest::toArray($airspace->alt_bottom)
            ),
            "polygon" => $airspace->polygon->position2dList
        );
    }
}
