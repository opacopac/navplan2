<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


readonly class DbAirportRunwayQuery implements IAirportRunwayQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param int $airportId
     * @return AirportRunway[]
     */
    public function read(int $airportId): array
    {
        $t = new DbTableAirportRunway();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondMulti::all(
                DbCondSimple::equals($t->colAirportId(), $airportId),
                DbCondSimple::equals($t->colOperations(), "ACTIVE")
            ))
            ->orderBy($t->colLength(), DbSortOrder::DESC)
            ->orderBy($t->colSurface(), DbSortOrder::ASC)
            ->orderBy($t->colId(), DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading runways for airport id " . $airportId);
        $converter = new DbAirportRunwayConverter($t);

        return $converter->fromDbResult($result);
    }
}
