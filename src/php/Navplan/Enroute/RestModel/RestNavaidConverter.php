<?php declare(strict_types=1);

namespace Navplan\Enroute\RestModel;

use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\Enroute\DomainModel\Navaid;


class RestNavaidConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "pos" => RestPosition2dConverter::toRest($navaid->position),
            "elevation" => RestLengthConverter::toRest($navaid->elevation),
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }


    public static function listToRest(array $navaidList): array {
        return array_map(function ($navaid) { return self::toRest($navaid); }, $navaidList);
    }
}
