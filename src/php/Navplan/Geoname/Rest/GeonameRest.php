<?php declare(strict_types=1);

namespace Navplan\Geoname\Rest;

use Navplan\Geoname\Domain\Geoname;
use Navplan\OpenAip\Rest\RestHelper;


class GeonameRest {
    public static function toArray(Geoname $geo): array {
        return array(
            "id" => $geo->id,
            "name" => $geo->name,
            "searchresultname" => $geo->searchresultname,
            "feature_class" => $geo->feature_class,
            "feature_code" => $geo->feature_code,
            "country" => $geo->country,
            "admin1" => $geo->admin1,
            "admin2" => $geo->admin2,
            "population" => $geo->population,
            "latitude" => RestHelper::reduceDegAccuracy($geo->position->latitude, "GEONAME"),
            "longitude" => RestHelper::reduceDegAccuracy($geo->position->longitude, "GEONAME"),
            "elevation" => $geo->elevation,
        );
    }
}
