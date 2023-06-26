<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbFlightrouteByShareIdQuery implements IFlightrouteByShareIdQuery {
    public function __construct(
        private IDbService $dbService,
        private IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    ) {
    }


    public function readByShareId(string $shareId): ?Flightroute {
        $query = "SELECT * FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE share_id=" . DbHelper::getDbStringValue($this->dbService, $shareId);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading shared flightroute");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
