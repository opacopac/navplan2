<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\OpenAip\Domain\Navaid;


class NavaidRest {
    public static function toArray(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "latitude" => RestHelper::reduceDegAccuracy($navaid->latitude, "NAVAID"),
            "longitude" => RestHelper::reduceDegAccuracy($navaid->longitude, "NAVAID"),
            "elevation" => $navaid->elevation,
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }
}
