<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\DomainModel\User;


class DbFlightrouteDeleteCommand implements IFlightrouteDeleteCommand {
    public function __construct(
        private IDbService $dbService,
        private IWaypointsDeleteCommand $deleteWaypointsCommand
    ) {
    }


    public function delete(int $flightrouteId, User $user) {
        $this->deleteWaypointsCommand->deleteWaypoints($flightrouteId);

        $query = "DELETE FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightroute::COL_ID . "=" . DbHelper::getDbIntValue($flightrouteId);
        $query .= " AND " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($user->id);
        $this->dbService->execCUDQuery($query, "error deleting flightroute");
    }
}
