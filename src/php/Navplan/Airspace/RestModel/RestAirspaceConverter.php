<?php declare(strict_types=1);

namespace Navplan\Airspace\RestModel;

use Navplan\Airspace\DomainModel\Airspace;
use Navplan\Geometry\RestModel\AltitudeConverter;
use Navplan\Geometry\RestModel\Ring2dConverter;


class RestAirspaceConverter {
    public const ROUND_DIGITS_POS = 4;


    public static function toRest(Airspace $airspace): array {
        return array(
            "id" => $airspace->id,
            "aip_id" => $airspace->aip_id,
            "category" => $airspace->category,
            "country" => $airspace->country,
            "name" => $airspace->name,
            "alt_top" => AltitudeConverter::toRest($airspace->alt_top),
            "alt_bottom" => AltitudeConverter::toRest($airspace->alt_bottom),
            "polygon" => Ring2dConverter::toRest($airspace->polygon, self::ROUND_DIGITS_POS)
        );
    }
}
