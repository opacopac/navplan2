<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Shared\StringNumberService;


class DbReportingPoint {
    public static function fromDbResult(array $rs): ReportingPoint {
        return new ReportingPoint(
            intval($rs["id"]),
            $rs["type"],
            $rs["airport_icao"],
            $rs["name"],
            !StringNumberService::isNullOrEmpty($rs, "heli") ? boolval($rs["heli"]) : FALSE,
            !StringNumberService::isNullOrEmpty($rs, "inbd_comp") ? boolval($rs["inbd_comp"]) : FALSE,
            !StringNumberService::isNullOrEmpty($rs, "outbd_comp") ? boolval($rs["outbd_comp"]): FALSE,
            !StringNumberService::isNullOrEmpty($rs, "min_ft") ? intval($rs["min_ft"]) : NULL,
            !StringNumberService::isNullOrEmpty($rs, "max_ft") ? intval($rs["max_ft"]) : NULL,
            self::readPos2dFromResult($rs), // only for reporting points
            !StringNumberService::isNullOrEmpty($rs, "polygon") ? Ring2d::createFromString($rs["polygon"]) : NULL // only for reporting sectors
        );
    }


    private static function readPos2dFromResult(array $rs): ?Position2d {
        if (StringNumberService::isNullOrEmpty($rs, "latitude") || StringNumberService::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
