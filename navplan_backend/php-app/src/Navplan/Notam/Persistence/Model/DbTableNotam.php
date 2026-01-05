<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableNotam extends DbTable
{
    public const string TABLE_NAME = "faa_notam";
    public const string COL_ID = "id";
    public const string COL_NOTAM_ID = "notam_id";
    public const string COL_COUNTRY = "country";
    public const string COL_TYPE = "type";
    public const string COL_ICAO = "icao";
    public const string COL_STARTDATE = "startdate";
    public const string COL_ENDDATE = "enddate";
    public const string COL_NOTAM = "notam";


    public function __construct(?string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_NOTAM_ID, DbColType::STRING);
        $this->addCol(self::COL_COUNTRY, DbColType::STRING);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_ICAO, DbColType::STRING);
        $this->addCol(self::COL_STARTDATE, DbColType::TIMESTAMP);
        $this->addCol(self::COL_ENDDATE, DbColType::TIMESTAMP);
        $this->addCol(self::COL_NOTAM, DbColType::STRING);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colNotamId(): DbCol
    {
        return self::getCol(self::COL_NOTAM_ID);
    }


    public function colCountry(): DbCol
    {
        return self::getCol(self::COL_COUNTRY);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colIcao(): DbCol
    {
        return self::getCol(self::COL_ICAO);
    }


    public function colStartDate(): DbCol
    {
        return self::getCol(self::COL_STARTDATE);
    }


    public function colEndDate(): DbCol
    {
        return self::getCol(self::COL_ENDDATE);
    }


    public function colNotam(): DbCol
    {
        return self::getCol(self::COL_NOTAM);
    }
}
