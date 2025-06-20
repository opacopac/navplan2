<?php declare(strict_types=1);

namespace Navplan\Airspace\Rest\Converter;

use Navplan\Airspace\Domain\Model\Airspace;
use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestRing2dConverter;


class RestAirspaceConverter {
    public const ROUND_DIGITS_POS = 5;


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
