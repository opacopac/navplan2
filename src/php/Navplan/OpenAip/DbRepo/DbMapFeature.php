<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\MapFeature;
use Navplan\Shared\StringNumberService;


class DbMapFeature {
    public static function fromDbResult(array $rs): MapFeature {
        return new MapFeature(
            $rs["type"],
            $rs["name"],
            self::getPosition($rs)
        );
    }


    private static function getPosition(array $rs): ?Position2d {
        if (StringNumberService::isNullOrEmpty($rs, "latitude") || StringNumberService::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
