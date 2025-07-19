<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


class DbFlightrouteListQuery implements IFlightrouteListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableFlightroute::TABLE_NAME)
            ->whereEquals(DbTableFlightroute::COL_ID_USER, $userId)
            ->orderBy(DbTableFlightroute::COL_TITLE, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute list");

        return DbFlightrouteConverter::fromDbResult($result);
    }
}
