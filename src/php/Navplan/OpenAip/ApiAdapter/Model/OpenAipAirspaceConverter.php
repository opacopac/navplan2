<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Enroute\DomainModel\Airspace;


class OpenAipAirspaceConverter {
    public static function fromRest(array $restItem): Airspace {
        $class = OpenAipAirspaceClassConverter::fromRest($restItem["icaoClass"]);
        $type = OpenAipAirspaceTypeConverter::fromRest($restItem["type"]);
        $category = Airspace::getCategoryString($class, $type);

        return new Airspace(
            -1,
            $class,
            $type,
            $category,
            $restItem["country"],
            $restItem["name"],
            OpenAipAltitudeConverter::fromRest($restItem["lowerLimit"]),
            OpenAipAltitudeConverter::fromRest($restItem["upperLimit"]),
            OpenAipPolygonConverter::fromRestGeometry($restItem["geometry"])
        );
    }


    /**
     * @param array $restList
     * @return Airspace[]
     */
    public static function fromRestList(array $restList): array {
        return array_map(function ($restItem) { return self::fromRest($restItem); }, $restList);
    }
}
