<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Enroute\Domain\Model\Navaid;


class OpenAipNavaidConverter {
    public static function fromRest(array $restNavaid): Navaid {
        return new Navaid(
            -1,
            OpenAipNavaidTypeConverter::fromRest($restNavaid["type"]),
            $restNavaid["identifier"],
            $restNavaid["name"],
            OpenAipPositionConverter::fromRestPointGeometry($restNavaid["geometry"]),
            OpenAipElevationConverter::fromRest($restNavaid["elevation"]),
            OpenAipFrequencyConverter::fromRest($restNavaid["frequency"]),
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
