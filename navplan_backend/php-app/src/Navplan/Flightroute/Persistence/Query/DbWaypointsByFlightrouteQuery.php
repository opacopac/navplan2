<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightrouteWaypoints;
use Navplan\System\Domain\Service\IDbService;


class DbWaypointsByFlightrouteQuery implements IWaypointsByFlightrouteQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function readWaypointForFlightroute(?Flightroute $flightroute) {
        if ($flightroute === null) {
            return;
        }

        $query = "SELECT * FROM " . DbTableFlightrouteWaypoints::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightrouteWaypoints::COL_ID_FLIGHTROUTE . "=" . $flightroute->id;
        $query .= " ORDER BY " . DbTableFlightrouteWaypoints::COL_SORTORDER . " ASC";

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
