<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

class DbTableAirspaceDetailLevels extends DbTable
{
    public const TABLE_NAME = "openaip_airspace_detaillevels";
    public const COL_ID = "id";
    public const COL_AIRSPACE_ID = "airspace_id";
    public const COL_ZOOM_MIN = "zoommin";
    public const COL_ZOOM_MAX = "zoommax";
    public const COL_POLYGON = "polygon";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_AIRSPACE_ID, DbColType::INT);
        $this->addCol(self::COL_ZOOM_MIN, DbColType::INT);
        $this->addCol(self::COL_ZOOM_MAX, DbColType::INT);
        $this->addCol(self::COL_POLYGON, DbColType::STRING);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colAirspaceId(): DbCol
    {
        return self::getCol(self::COL_AIRSPACE_ID);
    }


    public function colZoomMin(): DbCol
    {
        return self::getCol(self::COL_ZOOM_MIN);
    }


    public function colZoomMax(): DbCol
    {
        return self::getCol(self::COL_ZOOM_MAX);
    }


    public function colPolygon(): DbCol
    {
        return self::getCol(self::COL_POLYGON);
    }
}
