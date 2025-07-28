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
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


class DbChartRegistrationConverter
{
    public static function fromDbRow(DbRowAirportCharts $row): ChartRegistration
    {
        $geoCoordType = GeoCoordinateType::from($row->getGeocoordType());

        return new ChartRegistration(
            ChartRegistrationType::from($row->getRegistrationType()),
            $geoCoordType,
            XyCoord::create($row->getPos1PixelX(), $row->getPos1PixelY()),
            self::getGeoCoord($row->getPos1GeoCoordE(), $row->getPos1GeoCoordN(), $geoCoordType),
            XyCoord::create($row->getPos2PixelX(), $row->getPos2PixelY()),
            self::getGeoCoord($row->getPos2GeoCoordE(), $row->getPos2GeoCoordN(), $geoCoordType),
            $row->getChartScale() ?? 0
        );
    }


    public static function bindInsertValues(ChartRegistration $reg, IDbInsertCommandBuilder $icb, DbTableAirportCharts $table): void
    {
        $icb->setColValue($table->colRegistrationType(), $reg->registrationType->value)
            ->setColValue($table->colGeocoordType(), $reg->coordinateType->value)
            ->setColValue($table->colPos1PixelX(), $reg->pixelXy1->getIntX())
            ->setColValue($table->colPos1PixelY(), $reg->pixelXy1->getIntY())
            ->setColValue($table->colPos1GeoCoordE(), $reg->geoCoord1->getE())
            ->setColValue($table->colPos1GeoCoordN(), $reg->geoCoord2->getN())
            ->setColValue($table->colChartScale(), $reg->scale)
            ->setColValue($table->colPos2PixelX(), $reg->pixelXy2?->getIntX())
            ->setColValue($table->colPos2PixelY(), $reg->pixelXy2?->getIntY())
            ->setColValue($table->colPos2GeoCoordE(), $reg->geoCoord2?->getE())
            ->setColValue($table->colPos2GeoCoordN(), $reg->geoCoord2?->getN());
    }


    private static function getGeoCoord(?float $coordE, ?float $coordN, GeoCoordinateType $coordinateType): ?GeoCoordinate
    {
        if ($coordE == null || $coordN == null) {
            return null;
        }

        return match ($coordinateType) {
            GeoCoordinateType::LV03 => new Lv03Coordinate($coordE, $coordN),
            GeoCoordinateType::LV95 => new Lv95Coordinate($coordE, $coordN),
            GeoCoordinateType::LON_LAT => new Position2d($coordE, $coordN),
            default => throw new InvalidArgumentException("Unknown coordinate type: $coordinateType->value"),
        };
    }
}
