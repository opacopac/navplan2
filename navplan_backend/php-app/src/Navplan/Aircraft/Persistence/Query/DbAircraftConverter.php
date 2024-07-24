<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\Common\Persistence\Model\DbConsumptionConverter;
use Navplan\Common\Persistence\Model\DbSpeedConverter;
use Navplan\Common\Persistence\Model\DbWeightConverter;
use Navplan\System\Domain\Model\IDbResult;


class DbAircraftConverter
{
    public static function fromDbRow(array $row): Aircraft
    {
        return new Aircraft(
            intval($row[DbTableAircraft::COL_ID]),
            $row[DbTableAircraft::COL_VEHICLE_TYPE],
            $row[DbTableAircraft::COL_REGISTRATION],
            $row[DbTableAircraft::COL_ICAO_TYPE],
            DbSpeedConverter::fromDbRow($row, DbTableAircraft::COL_CRUISE_SPEED, SpeedUnit::KT),
            DbConsumptionConverter::fromDbRow($row, DbTableAircraft::COL_CRUISE_FUEL, ConsumptionUnit::L_PER_H),
            $row[DbTableAircraft::COL_FUEL_TYPE],
            DbWeightConverter::fromDbRow($row, DbTableAircraft::COL_MTOW, WeightUnit::KG),
            DbWeightConverter::fromDbRow($row, DbTableAircraft::COL_BEW, WeightUnit::KG)
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
