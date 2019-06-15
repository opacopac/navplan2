<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestLength;
use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\OpenAip\Domain\Navaid;


class RestNavaid {
    public const ROUND_DIGITS_POS = 6;


    public static function toRest(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "pos" => RestPosition2d::toRest($navaid->position),
            "elevation" => RestLength::toRest($navaid->elevation),
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }
}
