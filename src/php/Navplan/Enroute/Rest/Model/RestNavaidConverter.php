<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Model;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\Common\RestModel\RestFrequencyConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\Enroute\Domain\Model\Navaid;


class RestNavaidConverter {
    public static function toRest(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "pos" => RestPosition2dConverter::toRest($navaid->position),
            "elevation" => RestAltitudeConverter::toRest($navaid->elevation),
            "frequency" => RestFrequencyConverter::toRest($navaid->frequency),
            "declination" => $navaid->declination,
            "truenorth" => $navaid->isTrueNorth,
        );
    }


    public static function listToRest(array $navaidList): array {
        return array_map(function ($navaid) { return self::toRest($navaid); }, $navaidList);
    }
}
