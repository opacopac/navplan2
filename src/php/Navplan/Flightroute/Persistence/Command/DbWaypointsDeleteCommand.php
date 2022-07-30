<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Persistence\Model\DbTableFlightrouteWaypoints;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbWaypointsDeleteCommand implements IWaypointsDeleteCommand {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function deleteWaypoints(int $flightrouteId) {
        $query = "DELETE FROM " . DbTableFlightrouteWaypoints::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightrouteWaypoints::COL_ID_FLIGHTROUTE . "=" . DbHelper::getDbIntValue($flightrouteId);
        $this->dbService->execCUDQuery($query, "error deleting waypoints from flightroute");
    }
}
