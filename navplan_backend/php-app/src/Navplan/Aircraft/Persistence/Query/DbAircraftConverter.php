<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Model\FuelType;
use Navplan\Aircraft\Domain\Model\VehicleType;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Common\Persistence\Model\DbConsumptionConverter;
use Navplan\Common\Persistence\Model\DbLengthConverter;
use Navplan\Common\Persistence\Model\DbSpeedConverter;
use Navplan\Common\Persistence\Model\DbWeightConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbAircraftConverter
{
    public static function fromDbRow(array $row): Aircraft
    {
        return new Aircraft(
            intval($row[DbTableAircraft::COL_ID]),
            VehicleType::from($row[DbTableAircraft::COL_VEHICLE_TYPE]),
            $row[DbTableAircraft::COL_REGISTRATION],
            $row[DbTableAircraft::COL_ICAO_TYPE],
            DbSpeedConverter::fromDbRow($row, DbTableAircraft::COL_CRUISE_SPEED,
                DbTableAircraft::COL_SPEED_UNIT),
            DbConsumptionConverter::fromDbRow($row, DbTableAircraft::COL_CRUISE_CONSUMPTION,
                DbTableAircraft::COL_CONSUMPTION_UNIT),
            StringNumberHelper::isNullOrEmpty($row, DbTableAircraft::COL_FUEL_TYPE)
                ? null : FuelType::from($row[DbTableAircraft::COL_FUEL_TYPE]),
            DbWeightConverter::fromDbRow($row, DbTableAircraft::COL_MTOW, DbTableAircraft::COL_WEIGHT_UNIT),
            DbWeightConverter::fromDbRow($row, DbTableAircraft::COL_BEW, DbTableAircraft::COL_WEIGHT_UNIT),
            DbSpeedConverter::fromDbRow($row, DbTableAircraft::COL_ROC_SEALEVEL, DbTableAircraft::COL_VERTICAL_SPEED_UNIT),
            DbLengthConverter::fromDbRow($row, DbTableAircraft::COL_SERVICE_CEILING, DbTableAircraft::COL_ALTITUDE_UNIT),
            null,
            null,
            null,
            null,
            [],
            []
        );
    }


    /**
     * @param IDbResult $result
     * @return Aircraft[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $aircrafts = [];
        while ($row = $result->fetch_assoc()) {
            $aircrafts[] = DbAircraftConverter::fromDbRow($row);
        }

        return $aircrafts;
    }
}
