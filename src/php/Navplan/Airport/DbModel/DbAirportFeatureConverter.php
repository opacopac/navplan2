<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\AirportFeature;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Shared\StringNumberHelper;


class DbAirportFeatureConverter {
    public static function fromDbResult(array $rs): AirportFeature {
        return new AirportFeature(
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
