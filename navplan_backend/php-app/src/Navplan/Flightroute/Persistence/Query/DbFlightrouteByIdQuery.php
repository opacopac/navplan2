<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbFlightrouteByIdQuery implements IFlightrouteByIdQuery
{
    public function __construct(
        private IDbService $dbService,
        private IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    )
    {
    }


    public function read(int $flightrouteId, int $userId): ?Flightroute
    {
        $query = "SELECT * FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightroute::COL_ID . "=" . DbHelper::getDbIntValue($flightrouteId);
        $query .= " AND " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
