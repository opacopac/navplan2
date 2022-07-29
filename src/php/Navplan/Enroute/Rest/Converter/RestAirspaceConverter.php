<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestRing2dConverter;
use Navplan\Enroute\Domain\Model\Airspace;


class RestAirspaceConverter {
    public const ROUND_DIGITS_POS = 4;


    public static function toRest(Airspace $airspace): array {
        return array(
            "id" => $airspace->id,
            "category" => $airspace->category,
            "country" => $airspace->country,
            "name" => $airspace->name,
            "alt_top" => RestAltitudeConverter::toRest($airspace->alt_top),
            "alt_bottom" => RestAltitudeConverter::toRest($airspace->alt_bottom),
            "polygon" => RestRing2dConverter::toRest($airspace->polygon, self::ROUND_DIGITS_POS)
        );
    }


    public static function toRestList(array $airspaceList): array {
        return array_map(function ($airspace) { return self::toRest($airspace); }, $airspaceList);
    }
}
