<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Query;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Enroute\Persistence\Model\DbTableNavaid;
use Navplan\System\Domain\Service\IDbService;


class DbNavaidSearchByPositionQuery implements INavaidSearchByPositionQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM " . DbTableNavaid::TABLE_NAME;
        $query .= " WHERE";
        $query .= "  " . DbTableNavaid::COL_LATITUDE . " > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND " . DbTableNavaid::COL_LATITUDE . " < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND " . DbTableNavaid::COL_LONGITUDE . " > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND " . DbTableNavaid::COL_LONGITUDE . " < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((" . DbTableNavaid::COL_LATITUDE . " - " . $position->latitude . ") * (" . DbTableNavaid::COL_LATITUDE . " - " . $position->latitude .
            ") + (" . DbTableNavaid::COL_LONGITUDE . " - " . $position->longitude . ") * (" . DbTableNavaid::COL_LONGITUDE . " - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query,"error searching navaids by position");

        return DbNavaidSearchQueryCommon::fromDbResult($result);
    }
}
