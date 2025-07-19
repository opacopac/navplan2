<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


class DbAirportRunwayQuery implements IAirportRunwayQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param int $airportId
     * @return AirportRunway[]
     */
    public function read(int $airportId): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAirportRunway::TABLE_NAME)
            ->whereAll(
                DbCondSimple::create(DbTableAirportRunway::COL_AIRPORT_ID, DbCondOp::EQ, $airportId),
                DbCondSimple::create(DbTableAirportRunway::COL_OPERATIONS, DbCondOp::EQ, "ACTIVE")
            )
            ->orderBy(DbTableAirportRunway::COL_LENGTH, DbSortOrder::DESC)
            ->orderBy(DbTableAirportRunway::COL_SURFACE, DbSortOrder::ASC)
            ->orderBy(DbTableAirportRunway::COL_ID, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading runways for airport id " . $airportId);

        return DbAirportRunwayConverter::fromDbResult($result);
    }
}
