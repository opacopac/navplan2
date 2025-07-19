<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Domain\Model\DbSortOrder;
use Navplan\System\Domain\Service\IDbService;


class DbAerodromeReportingByTextQuery implements IAerodromeReportingByTextQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(string $searchText, int $maxResults): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableReportingPoints::TABLE_NAME)
            ->wherePrefixLike(DbTableReportingPoints::COL_NAME, $searchText)
            ->orderBy(DbTableReportingPoints::COL_AD_ICAO, DbSortOrder::ASC)
            ->orderBy(DbTableReportingPoints::COL_NAME, DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT * FROM " . DbTableReportingPoints::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableReportingPoints::COL_NAME . " LIKE '" . $searchText . "%'";
        $query .= " ORDER BY " . DbTableReportingPoints::COL_AD_ICAO . " ASC, " . DbTableReportingPoints::COL_NAME . " ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by text");

        return DbReportingPointConverter::fromDbResult($result);
    }
}
