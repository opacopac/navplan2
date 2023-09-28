<?php declare(strict_types=1);

namespace Navplan\Geoname\Rest\Model;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Geoname\Domain\Model\Geoname;


class RestGeonameConverter {
    public static function toRest(Geoname $geoname): array {
        return array(
            "id" => $geoname->id,
            "name" => $geoname->name,
            "searchresultname" => $geoname->searchresultname,
            "feature_class" => $geoname->feature_class,
            "feature_code" => $geoname->feature_code,
            "country" => $geoname->country,
            "admin1" => $geoname->admin1,
            "admin2" => $geoname->admin2,
            "population" => $geoname->population,
            "position" => RestPosition2dConverter::toRest($geoname->position),
            "elevation" => RestAltitudeConverter::toRest($geoname->elevation),
        );
    }


    public static function toRestList(array $geonames): array {
        return array_map(function (Geoname $geoname) { return RestGeonameConverter::toRest($geoname); }, $geonames);
    }
}
