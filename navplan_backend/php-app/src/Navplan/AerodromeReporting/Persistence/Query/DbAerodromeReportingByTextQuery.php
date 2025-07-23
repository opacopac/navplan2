<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
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
        $t = new DbTableReportingPoints();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondText::prefixLike($t->colName(), $searchText))
            ->orderBy($t->colAdIcao(), DbSortOrder::ASC)
            ->orderBy($t->colName(), DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by text");

        return DbReportingPointConverter::create()
            ->fromDbResult($result);
    }
}
