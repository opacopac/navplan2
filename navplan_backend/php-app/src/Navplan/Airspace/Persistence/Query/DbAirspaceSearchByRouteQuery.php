<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAirspaceSearchByRouteQuery implements IAirspaceSearchByRouteQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByRouteIntersection(array $lonLatList): array {
        $query = DbAirspaceSearchQueryCommon::getSelectClauseCommonPart();
        $query .= "  air." . DbTableAirspace::COL_POLYGON;
        $query .= " FROM " . DbTableAirspace::TABLE_NAME . " air";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air." . DbTableAirspace::COL_EXTENT . ", " . DbHelper::getDbLineString($lonLatList) . ")";
        $query .= "    AND";
        $query .= "  (air." . DbTableAirspace::COL_ALT_BOT_HEIGHT . " < " . DbAirspaceSearchQueryCommon::MAX_BOTTOM_ALT_FL . " OR air." . DbTableAirspace::COL_ALT_BOT_UNIT . " <> 'FL')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");

        return DbAirspaceSearchQueryCommon::fromDbResult($result);
    }
}
