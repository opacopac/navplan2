<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbFlightrouteByHashQuery implements IFlightrouteByHashQuery {
    public function __construct(
        private IDbService $dbService,
        private IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    ) {
    }


    public function readByHash(string $flightrouteHash): ?Flightroute {
        $query = "SELECT * FROM " . DbTableFlightroute::TABLE_NAME ;
        $query .= " WHERE md5_hash=" . DbHelper::getDbStringValue($this->dbService, $flightrouteHash);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute by hash");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
