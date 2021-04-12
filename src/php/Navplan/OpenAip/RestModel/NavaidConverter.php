<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\RestModel\LengthConverter;
use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\OpenAip\DomainModel\Navaid;


class NavaidConverter {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "pos" => Position2dConverter::toRest($navaid->position),
            "elevation" => LengthConverter::toRest($navaid->elevation),
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }
}
