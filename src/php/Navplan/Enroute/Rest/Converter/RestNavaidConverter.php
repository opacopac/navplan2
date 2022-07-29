<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestFrequencyConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
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


    public static function toRestList(array $navaidList): array {
        return array_map(function ($navaid) { return self::toRest($navaid); }, $navaidList);
    }
}
