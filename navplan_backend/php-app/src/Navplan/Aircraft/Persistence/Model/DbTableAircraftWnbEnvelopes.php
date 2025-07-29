<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAircraftWnbEnvelopes extends DbTable
{
    public const TABLE_NAME = "aircraft_wnb_envelopes";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_NAME = "name";
    public const COL_AXIS_TYPE = "axis_type";
    public const COL_LON_ENVELOPE = "lon_envelope";
    public const COL_LAT_ENVELOPE = "lat_envelope";
    public const COL_ARM_UNIT = "arm_unit";
    public const COL_WEIGHT_UNIT = "weight_unit";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_ID_AIRCRAFT, DbColType::INT);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_AXIS_TYPE, DbColType::STRING);
        $this->addCol(self::COL_LON_ENVELOPE, DbColType::STRING);
        $this->addCol(self::COL_LAT_ENVELOPE, DbColType::STRING, true);
        $this->addCol(self::COL_ARM_UNIT, DbColType::STRING);
        $this->addCol(self::COL_WEIGHT_UNIT, DbColType::STRING);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colIdAircraft(): DbCol
    {
        return self::getCol(self::COL_ID_AIRCRAFT);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colAxisType(): DbCol
    {
        return self::getCol(self::COL_AXIS_TYPE);
    }


    public function colLonEnvelope(): DbCol
    {
        return self::getCol(self::COL_LON_ENVELOPE);
    }


    public function colLatEnvelope(): DbCol
    {
        return self::getCol(self::COL_LAT_ENVELOPE);
    }


    public function colArmUnit(): DbCol
    {
        return self::getCol(self::COL_ARM_UNIT);
    }


    public function colWeightUnit(): DbCol
    {
        return self::getCol(self::COL_WEIGHT_UNIT);
    }
}
