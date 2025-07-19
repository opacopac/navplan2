<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbReportingPointConverter
{
    /**
     * @param IDbResult $result
     * @return ReportingPoint[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = self::fromDbRow($row);
        }
        return $reportingPoints;
    }


    public static function fromDbRow(array $row): ReportingPoint
    {
        $alt_min = StringNumberHelper::parseIntOrNull($row, DbTableReportingPoints::COL_MIN_FT);
        $alt_max = StringNumberHelper::parseIntOrNull($row, DbTableReportingPoints::COL_MAX_FT);

        return new ReportingPoint(
            intval($row[DbTableReportingPoints::COL_ID]),
            $row[DbTableReportingPoints::COL_TYPE],
            $row[DbTableReportingPoints::COL_AD_ICAO],
            $row[DbTableReportingPoints::COL_NAME],
            StringNumberHelper::parseBoolOrFalse($row, DbTableReportingPoints::COL_HELI),
            StringNumberHelper::parseBoolOrFalse($row, DbTableReportingPoints::COL_INBD_COMP),
            StringNumberHelper::parseBoolOrFalse($row, DbTableReportingPoints::COL_OUTBD_COMP),
            $alt_min ? new Length($alt_min, LengthUnit::FT) : NULL,
            $alt_max ? new Length($alt_max, LengthUnit::FT) : NULL,
            DbPosition2dConverter::fromDbRow($row), // only for reporting points
            !StringNumberHelper::isNullOrEmpty($row, DbTableReportingPoints::COL_POLYGON)
                ? Ring2d::createFromString($row[DbTableReportingPoints::COL_POLYGON])
                : NULL // only for reporting sectors
        );
    }
}
