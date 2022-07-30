<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IFlightrouteAddCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsAddCommand;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\DomainModel\User;


class DbFlightrouteAddCommand implements IFlightrouteAddCommand {
    public function __construct(
        private IDbService $dbService,
        private IWaypointsAddCommand $addWaypointsCommand
    ) {
    }


    public function add(Flightroute $flightroute, ?User $user): Flightroute {
        // create route
        $query = $this->getFlightrouteInsertSql($flightroute, $user?->id);
        $this->dbService->execCUDQuery($query, "error creating flightroute");
        $flightroute->id = $this->dbService->getInsertId();

        // waypoints & alternate
        $this->addWaypointsCommand->addWaypointsAndAlternate($flightroute);

        return $flightroute;
    }


    private function getFlightrouteInsertSql(Flightroute $flightroute, ?int $userId): string {
        $query = "INSERT INTO " . DbTableFlightroute::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableFlightroute::COL_ID_USER,
            DbTableFlightroute::COL_TITLE,
            DbTableFlightroute::COL_AC_SPEED,
            DbTableFlightroute::COL_AC_CONSUMPTION,
            DbTableFlightroute::COL_EXTRA_FUEL,
            DbTableFlightroute::COL_COMMENTS,
            DbTableFlightroute::COL_SHARE_ID,
            DbTableFlightroute::COL_MD5_HASH
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($this->dbService, $flightroute->title),
            DbHelper::getDbFloatValue($flightroute->aircraftSpeed->getKt(), "''"),
            DbHelper::getDbFloatValue($flightroute->aircraftConsumption->getLph(), "''"),
            DbHelper::getDbFloatValue($flightroute->extraFuelL, "''"),
            DbHelper::getDbStringValue($this->dbService, $flightroute->comments),
            DbHelper::getDbStringValue($this->dbService, $flightroute->shareId),
            DbHelper::getDbStringValue($this->dbService, $flightroute->hash)
        ]);
        $query .= ")";

        return $query;
    }
}
