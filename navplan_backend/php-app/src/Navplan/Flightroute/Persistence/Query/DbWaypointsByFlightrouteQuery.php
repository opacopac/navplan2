<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightrouteWaypoints;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


class DbWaypointsByFlightrouteQuery implements IWaypointsByFlightrouteQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function readWaypointForFlightroute(?Flightroute $flightroute)
    {
        if ($flightroute === null) {
            return;
        }
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableFlightrouteWaypoints::TABLE_NAME)
            ->whereEquals(DbTableFlightrouteWaypoints::COL_ID_FLIGHTROUTE, $flightroute->id)
            ->orderBy(DbTableFlightrouteWaypoints::COL_SORTORDER, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute waypoints");

        while ($row = $result->fetch_assoc()) {
            $wp = DbWaypointConverter::fromDbRow($row);
            if ($wp->isAlternate) {
                $flightroute->alternate = $wp;
            } else {
                $flightroute->waypoinList[] = $wp;
            }
        }
    }
}
