<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeArmDirection;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeAxisType;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeCoordinate;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbWnbEnvelopeConverter
{
    /**
     * @param WnbEnvelopeCoordinate[] $wnbEnvelopeCoordinates
     * @return string
     */
    public static function toDbString(IDbService $dbService, array $wnbEnvelopeCoordinates): string
    {
        $json = json_encode(array_map(function ($coord) {
            return [$coord->weight->getKg(), $coord->armCg->getM()];
        }, $wnbEnvelopeCoordinates));

        return DbHelper::getDbStringValue($dbService, $json);
    }


    public static function fromDbRow(array $row): WnbEnvelope
    {
        return new WnbEnvelope(
            $row[DbTableAircraftWnbEnvelopes::COL_NAME],
            WnbEnvelopeAxisType::from($row[DbTableAircraftWnbEnvelopes::COL_AXIS_TYPE]),
            WnbEnvelopeArmDirection::from($row[DbTableAircraftWnbEnvelopes::COL_ARM_DIRECTION]),
            self::parseCoordinates($row[DbTableAircraftWnbEnvelopes::COL_COORDINATES_KG_M])
        );
    }


    /**
     * @param string $jsonString
     * @return WnbEnvelopeCoordinate[]
     */
    private static function parseCoordinates(string $jsonString): array
    {
        return array_map(function ($coord) {
            return new WnbEnvelopeCoordinate(
                new Weight($coord[0], WeightUnit::KG),
                new Length($coord[1], LengthUnit::M)
            );
        }, json_decode($jsonString, true));
    }
}
