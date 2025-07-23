<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbFlightrouteByIdQuery implements IFlightrouteByIdQuery
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery
    )
    {
    }


    public function read(int $flightrouteId, int $userId): ?Flightroute
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableFlightroute::TABLE_NAME)
            ->where()->all(
                DBCondSimple::equals(DbTableFlightroute::COL_ID, $flightrouteId),
                DBCondSimple::equals(DbTableFlightroute::COL_ID_USER, $userId)
            )->end()
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading flightroute");

        $flightroute = DbFlightrouteConverter::fromDbRow($result->fetch_assoc());
        $this->waypointsByFlightrouteQuery->readWaypointForFlightroute($flightroute);

        return $flightroute;
    }
}
