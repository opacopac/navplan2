<?php declare(strict_types=1);

namespace Navplan\Enroute\RestModel;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\Common\RestModel\RestRing2dConverter;
use Navplan\Enroute\DomainModel\Airspace;


class RestAirspaceConverter {
    public const ROUND_DIGITS_POS = 4;


    public static function toRest(Airspace $airspace): array {
        return array(
            "id" => $airspace->id,
            "aip_id" => $airspace->aip_id,
            "category" => $airspace->category,
            "country" => $airspace->country,
            "name" => $airspace->name,
            "alt_top" => RestAltitudeConverter::toRest($airspace->alt_top),
            "alt_bottom" => RestAltitudeConverter::toRest($airspace->alt_bottom),
            "polygon" => RestRing2dConverter::toRest($airspace->polygon, self::ROUND_DIGITS_POS)
        );
    }


    public static function listToRest(array $airspaceList): array {
        return array_map(function ($airspace) { return self::toRest($airspace); }, $airspaceList);
    }
}
