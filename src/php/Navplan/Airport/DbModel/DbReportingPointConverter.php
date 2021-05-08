<?php declare(strict_types=1);

namespace Navplan\Airport\DbModel;

use Navplan\Airport\DomainModel\ReportingPoint;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\Shared\StringNumberHelper;


class DbReportingPointConverter {
    public static function fromDbResult(array $rs): ReportingPoint {
        $alt_min = StringNumberHelper::parseIntOrNull($rs, "min_ft");
        $alt_max = StringNumberHelper::parseIntOrNull($rs, "max_ft");

        return new ReportingPoint(
            intval($rs["id"]),
            $rs["type"],
            $rs["airport_icao"],
            $rs["name"],
            StringNumberHelper::parseBoolOrFalse($rs, "heli"),
            StringNumberHelper::parseBoolOrFalse($rs, "inbd_comp"),
            StringNumberHelper::parseBoolOrFalse($rs, "outbd_comp"),
            $alt_min ? new Length($alt_min, LengthUnit::FT) : NULL,
            $alt_max ? new Length($alt_max, LengthUnit::FT) : NULL,
            self::readPos2dFromResult($rs), // only for reporting points
            !StringNumberHelper::isNullOrEmpty($rs, "polygon") ? Ring2d::createFromString($rs["polygon"]) : NULL // only for reporting sectors
        );
    }


    private static function readPos2dFromResult(array $rs): ?Position2d {
        if (StringNumberHelper::isNullOrEmpty($rs, "latitude") || StringNumberHelper::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
