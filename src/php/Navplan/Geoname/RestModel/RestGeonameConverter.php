<?php declare(strict_types=1);

namespace Navplan\Geoname\RestModel;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\Geoname\DomainModel\Geoname;
use Navplan\OpenAip\RestModel\RestHelper;


class RestGeonameConverter {
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
            "latitude" => $geo->position->latitude,
            "longitude" => $geo->position->longitude,
            "elevation" => RestAltitudeConverter::toRest($geo->elevation),
        );
    }
}
