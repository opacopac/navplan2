<?php declare(strict_types=1);

namespace Navplan\OpenAip\Api\Model;

use Navplan\Enroute\DomainModel\Navaid;


class OpenAipApiNavaidConverter {
    public static function fromRest(array $restNavaid): Navaid {
        return new Navaid(
            -1,
            OpenAipApiNavaidTypeConverter::fromRest($restNavaid["type"]),
            $restNavaid["identifier"],
            $restNavaid["name"],
            OpenAipApiPositionConverter::fromRestGeometry($restNavaid["geometry"]),
            OpenAipApiElevationConverter::fromRest($restNavaid["elevation"]),
            OpenAipApiFrequencyConverter::fromRest($restNavaid["frequency"]),
            $restNavaid["magneticDeclination"],
            boolval($restNavaid["alignedTrueNorth"])
        );
    }


    /**
     * @param array $restNavaids
     * @return Navaid[]
     */
    public static function fromRestList(array $restNavaids): array {
        return array_map(function ($restNavaid) { return self::fromRest($restNavaid); }, $restNavaids);
    }
}
