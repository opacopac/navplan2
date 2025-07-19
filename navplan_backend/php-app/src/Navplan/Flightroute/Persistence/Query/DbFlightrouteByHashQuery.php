<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;


class DbFlightrouteByHashQuery implements IFlightrouteByHashQuery
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    )
    {
    }


    public function readByHash(string $flightrouteHash): ?Flightroute
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableFlightroute::TABLE_NAME)
            ->whereEquals(DbTableFlightroute::COL_MD5_HASH, $flightrouteHash)
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute by hash");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
