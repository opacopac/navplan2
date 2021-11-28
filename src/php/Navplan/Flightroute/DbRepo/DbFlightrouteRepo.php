<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\DomainModel\User;


class DbFlightrouteRepo implements IFlightrouteRepo {
    private $dbService;


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function add(Flightroute $flightroute, ?User $user): Flightroute {
        // create route
        $query = DbFlightrouteConverter::toInsertSql($this->dbService, $flightroute, $user ? $user->id : NULL);
        $this->dbService->execCUDQuery($query, "error creating flightroute");
        $flightroute->id = $this->dbService->getInsertId();

        // waypoints & alternate
        $this->createWaypointsAndAlternate($flightroute);

        return $flightroute;
    }


    public function delete(int $flightrouteId, User $user) {
        // delete waypoints
        $this->deleteWaypoints($flightrouteId);

        // delete route
        $query = "DELETE FROM navplan";
        $query .= " WHERE id=" . DbHelper::getDbIntValue($flightrouteId) . " AND user_id=" . DbHelper::getDbIntValue($user->id);
        $this->dbService->execCUDQuery($query, "error deleting flightroute");
    }


    public function update(Flightroute $flightroute, User $user): Flightroute {
        // update route
        $query = DbFlightrouteConverter::toUpdateSql($this->dbService, $flightroute, $user->id);
        $this->dbService->execCUDQuery($query, "error updating flightroute");

        // update waypoints
        $this->deleteWaypoints($flightroute->id);
        $this->createWaypointsAndAlternate($flightroute);

        return $flightroute;
    }


    public function read(int $flightrouteId, User $user): ?Flightroute {
        $query = "SELECT * FROM navplan";
        $query .= " WHERE id=" . DbHelper::getDbIntValue($flightrouteId) . " AND user_id=" . DbHelper::getDbIntValue($user->id);
        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute");

        return $this->getFlightrouteOrNull($result);
    }


    public function readByShareId(string $shareId): ?Flightroute {
        $query = "SELECT * FROM navplan";
        $query .= " WHERE share_id=" . DbHelper::getDbStringValue($this->dbService, $shareId);
        $result = $this->dbService->execSingleResultQuery($query, true, "error reading shared flightroute");

        return $this->getFlightrouteOrNull($result);
    }


    public function readByHash(string $flightrouteHash): ?Flightroute {
        $query = "SELECT * FROM navplan";
        $query .= " WHERE md5_hash=" . DbHelper::getDbStringValue($this->dbService, $flightrouteHash);
        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute by hash");

        return $this->getFlightrouteOrNull($result);
    }


    public function readList(User $user): array {
        $query = "SELECT * FROM navplan";
        $query .= " WHERE user_id=" . DbHelper::getDbIntValue($user->id);
        $query .= " ORDER BY title ASC";
        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute list");

        $routes = [];
        while ($row = $result->fetch_assoc()) {
            $routes[] = DbFlightrouteConverter::fromDbRow($row);
        }

        return $routes;
    }


    private function getFlightrouteOrNull(IDbResult $result): ?Flightroute {
        if ($result->getNumRows() === 1) {
            $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
            $this->readWaypoints($flightroute);
            return $flightroute;
        } else {
            return NULL;
        }
    }


    private function readWaypoints(Flightroute $flightroute) {
        $query = "SELECT * FROM navplan_waypoints";
        $query .= " WHERE navplan_id=" . DbHelper::getDbIntValue($flightroute->id) ;
        $query .= " ORDER BY sortorder ASC";
        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute waypoints");

        // create result array
        while ($row = $result->fetch_assoc()) {
            $wp = DbWaypointConverter::fromDbRow($row);

            if ($wp->isAlternate) {
                $flightroute->alternate = $wp;
            } else {
                $flightroute->waypoinList[] = $wp;
            }
        }
    }


    private function deleteWaypoints(int $flightrouteId) {
        $query = "DELETE FROM navplan_waypoints";
        $query .= " WHERE navplan_id=" . DbHelper::getDbIntValue($flightrouteId);
        $this->dbService->execCUDQuery($query, "error deleting waypoints from flightroute");
    }


    private function createWaypointsAndAlternate(Flightroute $flightroute) {
        // waypoints
        for ($i = 0; $i < count($flightroute->waypoinList); $i++) {
            $wp = $flightroute->waypoinList[$i];
            $query = DbWaypointConverter::toInsertSql($this->dbService, $wp, $flightroute->id, $i);
            $this->dbService->execCUDQuery($query, "error inserting waypoint");
        }

        // alternate
        if ($flightroute->alternate) {
            $query = DbWaypointConverter::toInsertSql($this->dbService, $flightroute->alternate, $flightroute->id, count($flightroute->waypoinList));
            $this->dbService->execCUDQuery($query, "error inserting alternate");
        }
    }
}
