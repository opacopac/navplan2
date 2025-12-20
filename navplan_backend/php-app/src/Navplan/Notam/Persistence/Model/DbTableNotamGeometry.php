<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableNotamGeometry extends DbTable
{
    public const TABLE_NAME = "icao_notam_geometry2";
    public const COL_ID = "id";
    public const COL_ICAO_NOTAM_ID = "icao_notam_id";
    public const COL_GEOMETRY = "geometry";
    public const COL_EXTENT = "extent";
    public const COL_DIAMETER = "diameter";
    public const COL_ZOOMMIN = "zoommin";
    public const COL_ZOOMMAX = "zoommax";


    public function __construct(?string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_ICAO_NOTAM_ID, DbColType::INT);
        $this->addCol(self::COL_GEOMETRY, DbColType::STRING);
        $this->addCol(self::COL_EXTENT, DbColType::GEO_POLY, true);
        $this->addCol(self::COL_DIAMETER, DbColType::DOUBLE);
        $this->addCol(self::COL_ZOOMMIN, DbColType::INT, true);
        $this->addCol(self::COL_ZOOMMAX, DbColType::INT, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colIcaoNotamId(): DbCol
    {
        return self::getCol(self::COL_ICAO_NOTAM_ID);
    }


    public function colGeometry(): DbCol
    {
        return self::getCol(self::COL_GEOMETRY);
    }


    public function colExtent(): DbCol
    {
        return self::getCol(self::COL_EXTENT);
    }


    public function colDiameter(): DbCol
    {
        return self::getCol(self::COL_DIAMETER);
    }


    public function colZoomMin(): DbCol
    {
        return self::getCol(self::COL_ZOOMMIN);
    }


    public function colZoomMax(): DbCol
    {
        return self::getCol(self::COL_ZOOMMAX);
    }
}
