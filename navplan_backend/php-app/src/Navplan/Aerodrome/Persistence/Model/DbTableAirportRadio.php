<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAirportRadio extends DbTable
{
    public const TABLE_NAME = "openaip_radios2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_CATEGORY = "category";
    public const COL_FREQUENCY = "frequency";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_IS_PRIMARY = "is_primary";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);

        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_AIRPORT_ID, DbColType::INT);
        $this->addCol(self::COL_CATEGORY, DbColType::STRING);
        $this->addCol(self::COL_FREQUENCY, DbColType::DOUBLE);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING, true);
        $this->addCol(self::COL_IS_PRIMARY, DbColType::BOOL);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colAirportId(): DbCol
    {
        return self::getCol(self::COL_AIRPORT_ID);
    }


    public function colCategory(): DbCol
    {
        return self::getCol(self::COL_CATEGORY);
    }


    public function colFrequency(): DbCol
    {
        return self::getCol(self::COL_FREQUENCY);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colIsPrimary(): DbCol
    {
        return self::getCol(self::COL_IS_PRIMARY);
    }
}
