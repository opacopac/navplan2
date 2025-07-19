<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;


class DbFlightrouteByShareIdQuery implements IFlightrouteByShareIdQuery
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    )
    {
    }


    public function readByShareId(string $shareId): ?Flightroute
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableFlightroute::TABLE_NAME)
            ->whereEquals(DbTableFlightroute::COL_SHARE_ID, $shareId)
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading shared flightroute");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
