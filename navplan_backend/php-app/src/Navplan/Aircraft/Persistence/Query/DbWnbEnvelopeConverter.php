<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeAxisType;
use Navplan\Aircraft\Domain\Model\WnbLatEnvelopeCoordinate;
use Navplan\Aircraft\Domain\Model\WnbLonEnvelopeCoordinate;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbWnbEnvelopeConverter
{
    /**
     * @param WnbLonEnvelopeCoordinate[] $lonEnvCoordinates
     * @return string
     */
    public static function lonEnvtoDbString(IDbService $dbService, array $lonEnvCoordinates): string
    {
        $json = json_encode(array_map(function ($coord) {
            return [$coord->weight->value, $coord->armCg->value];
        }, $lonEnvCoordinates));

        return DbHelper::getDbStringValue($dbService, $json);
    }


    /**
     * @param WnbLatEnvelopeCoordinate[] $latEnvCoordinates
     * @return string
     */
    public static function latEnvtoDbString(IDbService $dbService, array $latEnvCoordinates): string
    {
        $json = json_encode(array_map(function ($coord) {
            return [$coord->latArmCg->value, $coord->lonArmCg->value];
        }, $latEnvCoordinates));

        return DbHelper::getDbStringValue($dbService, $json);
    }


    public static function fromDbRow(array $row): WnbEnvelope
    {
        $armUnit = LengthUnit::from($row[DbTableAircraftWnbEnvelopes::COL_ARM_UNIT]);
        $weightUnit = WeightUnit::from($row[DbTableAircraftWnbEnvelopes::COL_WEIGHT_UNIT]);

        return new WnbEnvelope(
            $row[DbTableAircraftWnbEnvelopes::COL_NAME],
            WnbEnvelopeAxisType::from($row[DbTableAircraftWnbEnvelopes::COL_AXIS_TYPE]),
            self::parseLonCoordinates($row[DbTableAircraftWnbEnvelopes::COL_LON_ENVELOPE], $weightUnit, $armUnit),
            self::parseLatCoordinates($row[DbTableAircraftWnbEnvelopes::COL_LAT_ENVELOPE], $armUnit)
        );
    }


    /**
     * @param string $jsonString
     * @return WnbLonEnvelopeCoordinate[]
     */
    private static function parseLonCoordinates(string $jsonString, WeightUnit $weightUnit, LengthUnit $armUnit): array
    {
        return array_map(function ($coord) use ($weightUnit, $armUnit) {
            return new WnbLonEnvelopeCoordinate(
                new Weight($coord[0], $weightUnit),
                new Length($coord[1], $armUnit)
            );
        }, json_decode($jsonString, true));
    }


    /**
     * @param string $jsonString
     * @return WnbLatEnvelopeCoordinate[]
     */
    private static function parseLatCoordinates(?string $jsonString, LengthUnit $armUnit): array
    {
        if ($jsonString === NULL) {
            return [];
        }

        return array_map(function ($coord) use ($armUnit) {
            return new WnbLatEnvelopeCoordinate(
                new Length($coord[0], $armUnit),
                new Length($coord[1], $armUnit)
            );
        }, json_decode($jsonString, true));
    }
}
