<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;


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
                DbWhereSimple::create(DbTableAirportRunway::COL_AIRPORT_ID, DbWhereOp::EQ, $airportId),
                DbWhereSimple::create(DbTableAirportRunway::COL_OPERATIONS, DbWhereOp::EQ, "ACTIVE")
            )
            ->orderBy(DbTableAirportRunway::COL_LENGTH, DbSortOrder::DESC)
            ->orderBy(DbTableAirportRunway::COL_SURFACE, DbSortOrder::ASC)
            ->orderBy(DbTableAirportRunway::COL_ID, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading runways for airport id " . $airportId);

        return DbAirportRunwayConverter::fromDbResult($result);
    }
}
