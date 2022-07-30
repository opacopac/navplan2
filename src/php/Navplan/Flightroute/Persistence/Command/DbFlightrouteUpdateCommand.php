<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IFlightrouteUpdateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsAddCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\DomainModel\User;


class DbFlightrouteUpdateCommand implements IFlightrouteUpdateCommand {
    public function __construct(
        private IDbService $dbService,
        private IWaypointsDeleteCommand $deleteWaypointsCommand,
        private IWaypointsAddCommand $addWaypointsCommand
    ) {
    }


    public function update(Flightroute $flightroute, User $user): Flightroute {
        // update route
        $query = $this->getUpdateSql($flightroute, $user->id);
        $this->dbService->execCUDQuery($query, "error updating flightroute");

        // update waypoints
        $this->deleteWaypointsCommand->deleteWaypoints($flightroute->id);
        $this->addWaypointsCommand->addWaypointsAndAlternate($flightroute);

        return $flightroute;
    }


    public function getUpdateSql(Flightroute $flightroute, int $userId): string {
        $query = "UPDATE " . DbTableFlightroute::TABLE_NAME . " SET ";
        $query .= join(", ", [
            DbTableFlightroute::COL_TITLE . "=" . DbHelper::getDbStringValue($this->dbService, $flightroute->title),
            DbTableFlightroute::COL_AC_SPEED . "=" . DbHelper::getDbFloatValue($flightroute->aircraftSpeed->getKt(), "''"),
            DbTableFlightroute::COL_AC_CONSUMPTION . "=" . DbHelper::getDbFloatValue($flightroute->aircraftConsumption->getLph(), "''"),
            DbTableFlightroute::COL_EXTRA_FUEL . "=" . DbHelper::getDbFloatValue($flightroute->extraFuelL),
            DbTableFlightroute::COL_COMMENTS . "=" . DbHelper::getDbStringValue($this->dbService, $flightroute->comments),
            DbTableFlightroute::COL_SHARE_ID . "=" . DbHelper::getDbStringValue($this->dbService, $flightroute->shareId),
            DbTableFlightroute::COL_MD5_HASH . "=" . DbHelper::getDbStringValue($this->dbService, $flightroute->hash)
        ]);
        $query .= " WHERE " . DbTableFlightroute::COL_ID . "=" . DbHelper::getDbIntValue($flightroute->id);
        $query .= "  AND";
        $query .= " " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        return $query;
    }
}
