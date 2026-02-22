<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Command;

use Navplan\Flightroute\Domain\Command\IFlightrouteCreateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsCreateCommand;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbFlightrouteCreateCommand implements IFlightrouteCreateCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWaypointsCreateCommand $addWaypointsCommand
    )
    {
    }


    public function create(Flightroute $flightroute, ?int $userId): Flightroute
    {
        // create route
        $query = $this->getFlightrouteInsertSql($flightroute, $userId);
        $this->dbService->execCUDQuery($query, "error creating flightroute");
        $flightroute->id = $this->dbService->getInsertId();

        // waypoints & alternate
        $this->addWaypointsCommand->createWaypointsAndAlternate($flightroute);

        return $flightroute;
    }


    private function getFlightrouteInsertSql(Flightroute $flightroute, ?int $userId): string
    {
        $query = "INSERT INTO " . DbTableFlightroute::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableFlightroute::COL_ID_USER,
            DbTableFlightroute::COL_TITLE,
            DbTableFlightroute::COL_AC_SPEED,
            DbTableFlightroute::COL_AC_CONSUMPTION,
            DbTableFlightroute::COL_EXTRA_FUEL,
            DbTableFlightroute::COL_CRUISE_ALT_FT,
            DbTableFlightroute::COL_COMMENTS,
            DbTableFlightroute::COL_SHARE_ID,
            DbTableFlightroute::COL_MD5_HASH
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($this->dbService, $flightroute->title),
            DbHelper::getDbFloatValue($flightroute->aircraftSpeed->getKt()),
            DbHelper::getDbFloatValue($flightroute->aircraftConsumption->getLph()),
            DbHelper::getDbIntValue($flightroute->extraFuelMin),
            DbHelper::getDbFloatValue($flightroute->cruiseAltitude?->getFt()),
            DbHelper::getDbStringValue($this->dbService, $flightroute->comments),
            DbHelper::getDbStringValue($this->dbService, $flightroute->shareId),
            DbHelper::getDbStringValue($this->dbService, $flightroute->hash)
        ]);
        $query .= ")";

        return $query;
    }
}
