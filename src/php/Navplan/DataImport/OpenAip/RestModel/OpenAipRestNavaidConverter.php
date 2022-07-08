<?php declare(strict_types=1);

namespace Navplan\DataImport\OpenAip\RestModel;

use Navplan\Enroute\DomainModel\Navaid;


class OpenAipRestNavaidConverter {
    public static function fromRest(array $restNavaid): Navaid {
        return new Navaid(
            -1,
            OpenAipRestNavaidTypeConverter::fromRest($restNavaid["type"]),
            $restNavaid["identifier"],
            $restNavaid["name"],
            OpenAipRestPositionConverter::fromRestGeometry($restNavaid["geometry"]),
            OpenAipRestElevationConverter::fromRest($restNavaid["elevation"]),
            OpenAipRestFrequencyConverter::fromRest($restNavaid["frequency"]),
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
