<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbNavaidSearchByExtentQuery implements INavaidSearchByExtentQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);

        $query = "SELECT *";
        $query .= " FROM " . DbTableNavaid::TABLE_NAME;
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(" . DbTableNavaid::COL_LONLAT . ", " . $extent . ")";
        $query .= "    AND";
        $query .= "  " . DbTableNavaid::COL_ZOOMMIN . " <= " . $zoom;

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by extent");

        return DbNavaidSearchQueryCommon::fromDbResult($result);
    }
}
