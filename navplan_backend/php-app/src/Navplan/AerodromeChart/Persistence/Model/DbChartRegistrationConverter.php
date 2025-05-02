<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\ChartRegistrationType;
use Navplan\Common\Domain\Model\XyCoord;
use Navplan\Common\Domain\SwissTopo\Ch1903Coordinate;
use Navplan\Common\StringNumberHelper;


class DbChartRegistrationConverter
{
    public static function fromDbRow(array $row): ChartRegistration
    {
        return new ChartRegistration(
            ChartRegistrationType::from($row[DbTableAirportCharts::COL_REGISTRATION_TYPE]),
            new XyCoord(
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS1_PIXEL_X),
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS1_PIXEL_Y)
            ),
            new Ch1903Coordinate(
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS1_COORD_LV03_E),
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS1_COORD_LV03_N)
            ),
            self::getPos2Xy($row),
            self::getPos2Coord($row),
            StringNumberHelper::parseIntOrZero($row, DbTableAirportCharts::COL_CHART_SCALE),
        );
    }

    private static function getPos2Xy(array $row): ?XyCoord
    {
        if ($row[DbTableAirportCharts::COL_POS2_PIXEL_X] == null || $row[DbTableAirportCharts::COL_POS2_PIXEL_Y] == null) {
            return null;
        } else {
            return new XyCoord(
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS2_PIXEL_X),
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS2_PIXEL_Y)
            );
        }
    }


    private static function getPos2Coord(array $row): ?Ch1903Coordinate
    {
        if ($row[DbTableAirportCharts::COL_POS2_COORD_LV03_E] == null || $row[DbTableAirportCharts::COL_POS2_COORD_LV03_N] == null) {
            return null;
        } else {
            return new Ch1903Coordinate(
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS2_COORD_LV03_E),
                StringNumberHelper::parseFloatOrZero($row, DbTableAirportCharts::COL_POS2_COORD_LV03_N)
            );
        }
    }
}
