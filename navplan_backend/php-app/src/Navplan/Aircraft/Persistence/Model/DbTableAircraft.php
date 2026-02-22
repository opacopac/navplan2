<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAircraft extends DbTable
{
    public const TABLE_NAME = "aircraft";
    public const COL_ID = "id";
    public const COL_ID_USER = "user_id";
    public const COL_VEHICLE_TYPE = "vehicle_type";
    public const COL_REGISTRATION = "registration";
    public const COL_ICAO_TYPE = "icao_type";
    public const COL_CRUISE_SPEED = "speed";
    public const COL_SPEED_UNIT = "speed_unit";
    public const COL_CRUISE_CONSUMPTION = "cruise_consumption";
    public const COL_CONSUMPTION_UNIT = "consumption_unit";
    public const COL_FUEL_TYPE = "fuel_type";
    public const COL_BEW = "bew";
    public const COL_MTOW = "mtow";
    public const COL_WEIGHT_UNIT = "weight_unit";
    public const COL_ROC_SEALEVEL = "roc_sealevel";
    public const COL_VERTICAL_SPEED_UNIT = "vertical_speed_unit";
    public const COL_SERVICE_CEILING = "service_ceiling";
    public const COL_ALTITUDE_UNIT = "altitude_unit";
    public const COL_CRUISE_CLIMB_SPEED = "cruise_climb_speed";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_ID_USER, DbColType::INT);
        $this->addCol(self::COL_VEHICLE_TYPE, DbColType::STRING);
        $this->addCol(self::COL_REGISTRATION, DbColType::STRING);
        $this->addCol(self::COL_ICAO_TYPE, DbColType::STRING);
        $this->addCol(self::COL_CRUISE_SPEED, DbColType::DOUBLE);
        $this->addCol(self::COL_SPEED_UNIT, DbColType::STRING);
        $this->addCol(self::COL_CRUISE_CONSUMPTION, DbColType::DOUBLE);
        $this->addCol(self::COL_CONSUMPTION_UNIT, DbColType::STRING);
        $this->addCol(self::COL_FUEL_TYPE, DbColType::STRING, true);
        $this->addCol(self::COL_BEW, DbColType::DOUBLE, true);
        $this->addCol(self::COL_MTOW, DbColType::DOUBLE, true);
        $this->addCol(self::COL_WEIGHT_UNIT, DbColType::STRING, true);
        $this->addCol(self::COL_ROC_SEALEVEL, DbColType::DOUBLE, true);
        $this->addCol(self::COL_VERTICAL_SPEED_UNIT, DbColType::STRING, true);
        $this->addCol(self::COL_SERVICE_CEILING, DbColType::DOUBLE, true);
        $this->addCol(self::COL_ALTITUDE_UNIT, DbColType::STRING, true);
        $this->addCol(self::COL_CRUISE_CLIMB_SPEED, DbColType::DOUBLE, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colIdUser(): DbCol
    {
        return self::getCol(self::COL_ID_USER);
    }


    public function colVehicleType(): DbCol
    {
        return self::getCol(self::COL_VEHICLE_TYPE);
    }


    public function colRegistration(): DbCol
    {
        return self::getCol(self::COL_REGISTRATION);
    }


    public function colIcaoType(): DbCol
    {
        return self::getCol(self::COL_ICAO_TYPE);
    }


    public function colCruiseSpeed(): DbCol
    {
        return self::getCol(self::COL_CRUISE_SPEED);
    }


    public function colSpeedUnit(): DbCol
    {
        return self::getCol(self::COL_SPEED_UNIT);
    }


    public function colCruiseConsumption(): DbCol
    {
        return self::getCol(self::COL_CRUISE_CONSUMPTION);
    }


    public function colConsumptionUnit(): DbCol
    {
        return self::getCol(self::COL_CONSUMPTION_UNIT);
    }


    public function colFuelType(): DbCol
    {
        return self::getCol(self::COL_FUEL_TYPE);
    }


    public function colBew(): DbCol
    {
        return self::getCol(self::COL_BEW);
    }


    public function colMtow(): DbCol
    {
        return self::getCol(self::COL_MTOW);
    }


    public function colWeightUnit(): DbCol
    {
        return self::getCol(self::COL_WEIGHT_UNIT);
    }


    public function colRocSealevel(): DbCol
    {
        return self::getCol(self::COL_ROC_SEALEVEL);
    }


    public function colVerticalSpeedUnit(): DbCol
    {
        return self::getCol(self::COL_VERTICAL_SPEED_UNIT);
    }


    public function colServiceCeiling(): DbCol
    {
        return self::getCol(self::COL_SERVICE_CEILING);
    }


    public function colAltitudeUnit(): DbCol
    {
        return self::getCol(self::COL_ALTITUDE_UNIT);
    }


    public function colCruiseClimbSpeed(): DbCol
    {
        return self::getCol(self::COL_CRUISE_CLIMB_SPEED);
    }
}
