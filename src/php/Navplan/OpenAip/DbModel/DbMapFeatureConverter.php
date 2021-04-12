<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbModel;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainModel\MapFeature;
use Navplan\Shared\StringNumberHelper;


class DbMapFeatureConverter {
    public static function fromDbResult(array $rs): MapFeature {
        return new MapFeature(
            $rs["type"],
            $rs["name"],
            self::getPosition($rs)
        );
    }


    private static function getPosition(array $rs): ?Position2d {
        if (StringNumberHelper::isNullOrEmpty($rs, "latitude") || StringNumberHelper::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
