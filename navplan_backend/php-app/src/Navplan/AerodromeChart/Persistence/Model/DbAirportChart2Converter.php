<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\Common\Persistence\Model\DbExtent2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\IDbResult;


class DbAirportChart2Converter
{
    /**
     * @param IDbResult $result
     * @return AirportChart[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = self::fromDbRow($row);
        }

        return $charts;
    }


    public static function fromDbRow(array $row): AirportChart
    {
        return new AirportChart(
            intval($row[DbTableAirportCharts::COL_ID]),
            StringNumberHelper::parseIntOrNull($row, DbTableAirportCharts::COL_USER_ID),
            $row[DbTableAirportCharts::COL_AD_ICAO],
            $row[DbTableAirportCharts::COL_SOURCE],
            $row[DbTableAirportCharts::COL_NAME],
            $row[DbTableAirportCharts::COL_FILENAME],
            DbExtent2dConverter::fromDbRow($row),
            DbOriginalFileParametersConverter::fromDbRow($row),
            DbChartRegistrationConverter::fromDbRow($row),
        );
    }
}
