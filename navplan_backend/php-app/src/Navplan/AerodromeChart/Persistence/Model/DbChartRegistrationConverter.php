<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\ChartRegistrationType;
use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;
use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\XyCoord;
use Navplan\Common\Domain\SwissTopo\Lv03Coordinate;
use Navplan\Common\Domain\SwissTopo\Lv95Coordinate;
use Navplan\Common\StringNumberHelper;


class DbChartRegistrationConverter
{
    public static function fromDbRow(array $row): ChartRegistration
    {
        $geoCoordType = GeoCoordinateType::from($row[DbTableAirportCharts::COL_GEOCOORD_TYPE]);

        return new ChartRegistration(
            ChartRegistrationType::from($row[DbTableAirportCharts::COL_REGISTRATION_TYPE]),
            $geoCoordType,
            self::getPos2Xy($row, DbTableAirportCharts::COL_POS1_PIXEL_X, DbTableAirportCharts::COL_POS1_PIXEL_Y),
            self::getGeoCoord(
                $row,
                DbTableAirportCharts::COL_POS1_GEOCOORD_E,
                DbTableAirportCharts::COL_POS1_GEOCOORD_N,
                $geoCoordType
            ),
            self::GetPos2Xy($row, DbTableAirportCharts::COL_POS2_PIXEL_X, DbTableAirportCharts::COL_POS2_PIXEL_Y),
            self::getGeoCoord(
                $row,
                DbTableAirportCharts::COL_POS2_GEOCOORD_E,
                DbTableAirportCharts::COL_POS2_GEOCOORD_N,
                $geoCoordType
            ),
            StringNumberHelper::parseIntOrZero($row, DbTableAirportCharts::COL_CHART_SCALE),
        );
    }


    private static function getPos2Xy(array $row, string $keyX, string $keyY): ?XyCoord
    {
        if ($row[$keyX] == null || $row[$keyY] == null) {
            return null;
        } else {
            return new XyCoord(
                StringNumberHelper::parseFloatOrZero($row, $keyX),
                StringNumberHelper::parseFloatOrZero($row, $keyY)
            );
        }
    }


    private static function getGeoCoord(array $row, string $keyE, string $keyN, GeoCoordinateType $coordinateType): ?GeoCoordinate
    {
        if ($row[$keyE] == null || $row[$keyN] == null) {
            return null;
        } else {
            $eValue = StringNumberHelper::parseFloatOrError($row, $keyE);
            $nValue = StringNumberHelper::parseFloatOrError($row, $keyN);
            switch ($coordinateType) {
                case GeoCoordinateType::LV03:
                    return new Lv03Coordinate($eValue, $nValue);
                case GeoCoordinateType::LV95:
                    return new Lv95Coordinate($eValue, $nValue);
                case GeoCoordinateType::LAT_LON:
                    return new Position2d($eValue, $nValue);
                default:
                    throw new InvalidArgumentException("Unknown coordinate type: $coordinateType->value");
            }
        }
    }
}
