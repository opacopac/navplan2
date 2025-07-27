<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

class DbTableAirspace extends DbTable
{
    public const TABLE_NAME = "openaip_airspace2";
    public const COL_ID = "id";
    public const COL_CATEGORY = "category";
    public const COL_CLASS = "class";
    public const COL_TYPE = "type";
    public const COL_COUNTRY = "country";
    public const COL_NAME = "name";
    public const COL_ALT_TOP_REF = "alt_top_reference";
    public const COL_ALT_TOP_HEIGHT = "alt_top_height";
    public const COL_ALT_TOP_UNIT = "alt_top_unit";
    public const COL_ALT_BOT_REF = "alt_bottom_reference";
    public const COL_ALT_BOT_HEIGHT = "alt_bottom_height";
    public const COL_ALT_BOT_UNIT = "alt_bottom_unit";
    public const COL_DIAMETER = "diameter";
    public const COL_POLYGON = "polygon";
    public const COL_EXTENT = "extent";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_CATEGORY, DbColType::STRING);
        $this->addCol(self::COL_CLASS, DbColType::STRING, true);
        $this->addCol(self::COL_TYPE, DbColType::STRING, true);
        $this->addCol(self::COL_COUNTRY, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_ALT_TOP_REF, DbColType::STRING);
        $this->addCol(self::COL_ALT_TOP_HEIGHT, DbColType::INT);
        $this->addCol(self::COL_ALT_TOP_UNIT, DbColType::STRING);
        $this->addCol(self::COL_ALT_BOT_REF, DbColType::STRING);
        $this->addCol(self::COL_ALT_BOT_HEIGHT, DbColType::INT);
        $this->addCol(self::COL_ALT_BOT_UNIT, DbColType::STRING);
        $this->addCol(self::COL_DIAMETER, DbColType::DOUBLE, true);
        $this->addCol(self::COL_POLYGON, DbColType::STRING);
        $this->addCol(self::COL_EXTENT, DbColType::GEO_POLY);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colCategory(): DbCol
    {
        return self::getCol(self::COL_CATEGORY);
    }


    public function colClass(): DbCol
    {
        return self::getCol(self::COL_CLASS);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colCountry(): DbCol
    {
        return self::getCol(self::COL_COUNTRY);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colAltTopRef(): DbCol
    {
        return self::getCol(self::COL_ALT_TOP_REF);
    }


    public function colAltTopHeight(): DbCol
    {
        return self::getCol(self::COL_ALT_TOP_HEIGHT);
    }


    public function colAltTopUnit(): DbCol
    {
        return self::getCol(self::COL_ALT_TOP_UNIT);
    }


    public function colAltBotRef(): DbCol
    {
        return self::getCol(self::COL_ALT_BOT_REF);
    }


    public function colAltBotHeight(): DbCol
    {
        return self::getCol(self::COL_ALT_BOT_HEIGHT);
    }


    public function colAltBotUnit(): DbCol
    {
        return self::getCol(self::COL_ALT_BOT_UNIT);
    }


    public function colDiameter(): DbCol
    {
        return self::getCol(self::COL_DIAMETER);
    }


    public function colPolygon(): DbCol
    {
        return self::getCol(self::COL_POLYGON);
    }


    public function colExtent(): DbCol
    {
        return self::getCol(self::COL_EXTENT);
    }
}
