<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Navaid;


class RestNavaid {
    public static function toArray(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "latitude" => RestHelper::reduceDegAccuracy($navaid->position->latitude, "NAVAID"),
            "longitude" => RestHelper::reduceDegAccuracy($navaid->position->longitude, "NAVAID"),
            "elevation" => $navaid->elevation,
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }
}
