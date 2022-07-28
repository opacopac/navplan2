<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Service;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByPositionQuery;
use Navplan\Enroute\Persistence\Model\DbTableAirspace;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirspaceSearchByPositionQuery implements IAirspaceSearchByPositionQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByPosition(Position2d $position2d): array {
        $query = DbAirspaceSearchQueryCommon::getSelectClauseCommonPart();
        $query .= "  NULL AS " . DbTableAirspace::COL_POLYGON;
        $query .= " FROM " . DbTableAirspace::TABLE_NAME . " air";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air." . DbTableAirspace::COL_EXTENT . ", " . DbHelper::getDbPointStringFromPos($position2d) . ")";
        $query .= "    AND";
        $query .= "  (air." . DbTableAirspace::COL_ALT_BOT_HEIGHT . " < " . DbAirspaceSearchQueryCommon::MAX_BOTTOM_ALT_FL . " OR air." . DbTableAirspace::COL_ALT_BOT_UNIT . " <> 'FL')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");

        return DbAirspaceSearchQueryCommon::fromDbResult($result);
    }
}
