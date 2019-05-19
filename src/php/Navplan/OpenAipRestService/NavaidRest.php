<?php declare(strict_types=1);

namespace Navplan\OpenAipRestService;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAipRestService\OpenAipRestHelper;


class NavaidRest {
    public static function toArray(Navaid $navaid): array {
        return array(
            "id" => $navaid->id,
            "type" => $navaid->type,
            "kuerzel" => $navaid->kuerzel,
            "name" => $navaid->name,
            "latitude" => OpenAipRestHelper::reduceDegAccuracy($navaid->latitude, "NAVAID"),
            "longitude" => OpenAipRestHelper::reduceDegAccuracy($navaid->longitude, "NAVAID"),
            "elevation" => $navaid->elevation,
            "frequency" => $navaid->frequency,
            "unit" => $navaid->unit,
            "declination" => $navaid->declination,
            "truenorth" => $navaid->truenorth,
        );
    }
}
