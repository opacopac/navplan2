<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAircraftWeightItems extends DbTable
{
    public const TABLE_NAME = "aircraft_weight_items";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_ARM_LONG = "arm_long";
    public const COL_ARM_LAT = "arm_lat";
    public const COL_ARM_UNIT = "arm_unit";
    public const COL_MAX_WEIGHT = "max_weight";
    public const COL_DEFAULT_WEIGHT = "default_weight";
    public const COL_WEIGHT_UNIT = "weight_unit";
    public const COL_MAX_FUEL = "max_fuel";
    public const COL_DEFAULT_FUEL = "default_fuel";
    public const COL_FUEL_UNIT = "fuel_unit";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_ID_AIRCRAFT, DbColType::INT);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_ARM_LONG, DbColType::DOUBLE);
        $this->addCol(self::COL_ARM_LAT, DbColType::DOUBLE);
        $this->addCol(self::COL_ARM_UNIT, DbColType::STRING);
        $this->addCol(self::COL_MAX_WEIGHT, DbColType::DOUBLE, true);
        $this->addCol(self::COL_DEFAULT_WEIGHT, DbColType::DOUBLE, true);
        $this->addCol(self::COL_WEIGHT_UNIT, DbColType::STRING, true);
        $this->addCol(self::COL_MAX_FUEL, DbColType::DOUBLE, true);
        $this->addCol(self::COL_DEFAULT_FUEL, DbColType::DOUBLE, true);
        $this->addCol(self::COL_FUEL_UNIT, DbColType::STRING, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colIdAircraft(): DbCol
    {
        return self::getCol(self::COL_ID_AIRCRAFT);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colArmLong(): DbCol
    {
        return self::getCol(self::COL_ARM_LONG);
    }


    public function colArmLat(): DbCol
    {
        return self::getCol(self::COL_ARM_LAT);
    }


    public function colArmUnit(): DbCol
    {
        return self::getCol(self::COL_ARM_UNIT);
    }


    public function colMaxWeight(): DbCol
    {
        return self::getCol(self::COL_MAX_WEIGHT);
    }


    public function colDefaultWeight(): DbCol
    {
        return self::getCol(self::COL_DEFAULT_WEIGHT);
    }


    public function colWeightUnit(): DbCol
    {
        return self::getCol(self::COL_WEIGHT_UNIT);
    }


    public function colMaxFuel(): DbCol
    {
        return self::getCol(self::COL_MAX_FUEL);
    }


    public function colDefaultFuel(): DbCol
    {
        return self::getCol(self::COL_DEFAULT_FUEL);
    }


    public function colFuelUnit(): DbCol
    {
        return self::getCol(self::COL_FUEL_UNIT);
    }
}
