<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\Common\StringNumberHelper;


class DbReportingPointConverter {
    public static function fromDbRow(array $row): ReportingPoint {
        $alt_min = StringNumberHelper::parseIntOrNull($row, "min_ft");
        $alt_max = StringNumberHelper::parseIntOrNull($row, "max_ft");

        return new ReportingPoint(
            intval($row["id"]),
            $row["type"],
            $row["airport_icao"],
            $row["name"],
            StringNumberHelper::parseBoolOrFalse($row, "heli"),
            StringNumberHelper::parseBoolOrFalse($row, "inbd_comp"),
            StringNumberHelper::parseBoolOrFalse($row, "outbd_comp"),
            $alt_min ? new Length($alt_min, LengthUnit::FT) : NULL,
            $alt_max ? new Length($alt_max, LengthUnit::FT) : NULL,
            DbPosition2dConverter::fromDbRow($row), // only for reporting points
            !StringNumberHelper::isNullOrEmpty($row, "polygon") ? Ring2d::createFromString($row["polygon"]) : NULL // only for reporting sectors
        );
    }
}
