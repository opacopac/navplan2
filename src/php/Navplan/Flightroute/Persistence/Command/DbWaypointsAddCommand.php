<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IWaypointsAddCommand;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\Waypoint;
use Navplan\Flightroute\Persistence\Model\DbTableFlightrouteWaypoints;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbWaypointsAddCommand implements IWaypointsAddCommand {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function addWaypointsAndAlternate(Flightroute $flightroute) {
        // waypoints
        for ($i = 0; $i < count($flightroute->waypoinList); $i++) {
            $wp = $flightroute->waypoinList[$i];
            $query = $this->getWaypointInsertSql($wp, $flightroute->id, $i);
            $this->dbService->execCUDQuery($query, "error inserting waypoint");
        }

        // alternate
        if ($flightroute->alternate) {
            $query = $this->getWaypointInsertSql($flightroute->alternate, $flightroute->id, count($flightroute->waypoinList));
            $this->dbService->execCUDQuery($query, "error inserting alternate");
        }
    }


    private function getWaypointInsertSql(Waypoint $waypoint, int $flightrouteId, int $sortOrder): string {
        $query = "INSERT INTO " . DbTableFlightrouteWaypoints::TABLE_NAME . " (" . join(",", [
            DbTableFlightrouteWaypoints::COL_ID_FLIGHTROUTE,
            DbTableFlightrouteWaypoints::COL_SORTORDER,
            DbTableFlightrouteWaypoints::COL_TYPE,
            DbTableFlightrouteWaypoints::COL_FREQUENCY,
            DbTableFlightrouteWaypoints::COL_CALLSIGN,
            DbTableFlightrouteWaypoints::COL_CHECKPOINT,
            DbTableFlightrouteWaypoints::COL_AD_ICAO,
            DbTableFlightrouteWaypoints::COL_LATITUDE,
            DbTableFlightrouteWaypoints::COL_LONGITUDE,
            DbTableFlightrouteWaypoints::COL_ALTITUDE,
            DbTableFlightrouteWaypoints::COL_IS_MIN_ALT,
            DbTableFlightrouteWaypoints::COL_IS_MAX_ALT,
            DbTableFlightrouteWaypoints::COL_IS_ALT_AT_LEG_START,
            DbTableFlightrouteWaypoints::COL_REMARK,
            DbTableFlightrouteWaypoints::COL_SUPP_INFO,
            DbTableFlightrouteWaypoints::COL_IS_ALTERNATE
        ]);
        $query .= ") VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($flightrouteId),
            DbHelper::getDbIntValue($sortOrder),
            DbHelper::getDbStringValue($this->dbService, $waypoint->type),
            DbHelper::getDbStringValue($this->dbService, $waypoint->frequency),
            DbHelper::getDbStringValue($this->dbService, $waypoint->callsign),
            DbHelper::getDbStringValue($this->dbService, $waypoint->checkpoint),
            DbHelper::getDbStringValue($this->dbService, $waypoint->airportIcao),
            DbHelper::getDbFloatValue($waypoint->position->latitude),
            DbHelper::getDbFloatValue($waypoint->position->longitude),
            DbHelper::getDbIntValue((int) $waypoint->wpAltitude->altitude->getHeightAmsl()->getFt()),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isMinAlt),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isMaxAlt),
            DbHelper::getDbBoolValue($waypoint->wpAltitude->isAltAtLegStart),
            DbHelper::getDbStringValue($this->dbService, $waypoint->remark),
            DbHelper::getDbStringValue($this->dbService, $waypoint->suppInfo),
            DbHelper::getDbBoolValue($waypoint->isAlternate)
        ));

        return $query;
    }
}
