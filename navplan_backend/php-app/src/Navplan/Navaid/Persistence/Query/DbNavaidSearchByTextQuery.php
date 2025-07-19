<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;


class DbNavaidSearchByTextQuery implements INavaidSearchByTextQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT *";
        $query .= " FROM " . DbTableNavaid::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableNavaid::COL_KUERZEL . " LIKE '" . $searchText . "%'";
        $query .= "   OR " . DbTableNavaid::COL_NAME . " LIKE '" . $searchText . "%'";
        $query .= " ORDER BY CASE WHEN " . DbTableNavaid::COL_COUNTRY . " = 'CH' THEN 1 ELSE 2 END ASC, kuerzel ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by text");

        return DbNavaidSearchQueryCommon::fromDbResult($result);
    }
}
