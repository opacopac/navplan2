<?php declare(strict_types=1);

namespace Navplan\Geoname\RestModel;

use Navplan\Geometry\RestModel\AltitudeConverter;
use Navplan\Geoname\DomainModel\Geoname;
use Navplan\OpenAip\RestModel\RestHelper;


class GeonameConverter {
    public static function toRest(Geoname $geo): array {
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
            "elevation" => AltitudeConverter::toRest($geo->elevation),
        );
    }
}
