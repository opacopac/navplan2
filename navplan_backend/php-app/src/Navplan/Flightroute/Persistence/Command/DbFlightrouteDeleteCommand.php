<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbFlightrouteDeleteCommand implements IFlightrouteDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWaypointsDeleteCommand $deleteWaypointsCommand
    )
    {
    }


    public function delete(int $flightrouteId, int $userId)
    {
        $this->deleteWaypointsCommand->deleteWaypoints($flightrouteId);

        $query = "DELETE FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightroute::COL_ID . "=" . DbHelper::getDbIntValue($flightrouteId);
        $query .= " AND " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting flightroute");
    }
}
