<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAircraftTypeDesignator extends DbTable
{
    public const TABLE_NAME = "icao_aircraft_type";
    public const COL_ID = "id";
    public const COL_DESIGNATOR = "designator";
    public const COL_MODEL = "model";
    public const COL_MANUFACTURER = "manufacturer";
    public const COL_AC_TYPE = "ac_type";
    public const COL_ENG_TYPE = "eng_type";
    public const COL_ENG_COUNT = "eng_count";
    public const COL_WTC = "wtc";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_DESIGNATOR, DbColType::STRING);
        $this->addCol(self::COL_MODEL, DbColType::STRING);
        $this->addCol(self::COL_MANUFACTURER, DbColType::STRING);
        $this->addCol(self::COL_AC_TYPE, DbColType::STRING);
        $this->addCol(self::COL_ENG_TYPE, DbColType::STRING);
        $this->addCol(self::COL_ENG_COUNT, DbColType::INT);
        $this->addCol(self::COL_WTC, DbColType::STRING);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colDesignator(): DbCol
    {
        return self::getCol(self::COL_DESIGNATOR);
    }


    public function colModel(): DbCol
    {
        return self::getCol(self::COL_MODEL);
    }


    public function colManufacturer(): DbCol
    {
        return self::getCol(self::COL_MANUFACTURER);
    }


    public function colAcType(): DbCol
    {
        return self::getCol(self::COL_AC_TYPE);
    }


    public function colEngType(): DbCol
    {
        return self::getCol(self::COL_ENG_TYPE);
    }


    public function colEngCount(): DbCol
    {
        return self::getCol(self::COL_ENG_COUNT);
    }


    public function colWtc(): DbCol
    {
        return self::getCol(self::COL_WTC);
    }
}
