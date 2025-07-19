<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


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

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by text");

        return DbReportingPointConverter::fromDbResult($result);
    }
}
