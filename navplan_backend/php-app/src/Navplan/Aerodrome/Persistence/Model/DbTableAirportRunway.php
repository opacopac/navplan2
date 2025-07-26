<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAirportRunway extends DBTable
{
    public const TABLE_NAME = "openaip_runways2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_OPERATIONS = "operations";
    public const COL_NAME = "name";
    public const COL_SURFACE = "surface";
    public const COL_LENGTH = "length";
    public const COL_WIDTH = "width";
    public const COL_DIRECTION = "direction";
    public const COL_TORA = "tora";
    public const COL_LDA = "lda";
    public const COL_PAPI = "papi";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);

        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_AIRPORT_ID, DbColType::INT);
        $this->addCol(self::COL_OPERATIONS, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_SURFACE, DbColType::STRING);
        $this->addCol(self::COL_LENGTH, DbColType::DOUBLE);
        $this->addCol(self::COL_WIDTH, DbColType::DOUBLE);
        $this->addCol(self::COL_DIRECTION, DbColType::INT);
        $this->addCol(self::COL_TORA, DbColType::INT, true);
        $this->addCol(self::COL_LDA, DbColType::INT, true);
        $this->addCol(self::COL_PAPI, DbColType::BOOL, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colAirportId(): DbCol
    {
        return self::getCol(self::COL_AIRPORT_ID);
    }


    public function colOperations(): DbCol
    {
        return self::getCol(self::COL_OPERATIONS);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colSurface(): DbCol
    {
        return self::getCol(self::COL_SURFACE);
    }


    public function colLength(): DbCol
    {
        return self::getCol(self::COL_LENGTH);
    }


    public function colWidth(): DbCol
    {
        return self::getCol(self::COL_WIDTH);
    }


    public function colDirection(): DbCol
    {
        return self::getCol(self::COL_DIRECTION);
    }


    public function colTora(): DbCol
    {
        return self::getCol(self::COL_TORA);
    }


    public function colLda(): DbCol
    {
        return self::getCol(self::COL_LDA);
    }


    public function colPapi(): DbCol
    {
        return self::getCol(self::COL_PAPI);
    }
}
