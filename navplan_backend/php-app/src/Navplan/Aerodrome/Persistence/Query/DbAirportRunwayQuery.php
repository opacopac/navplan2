<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Domain\Service\IDbService;


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
        $query = "SELECT *";
        $query .= " FROM " . DbTableAirportRunway::TABLE_NAME;
        $query .= " WHERE " . DbTableAirportRunway::COL_AIRPORT_ID . " = " . $airportId;
        $query .= "  AND " . DbTableAirportRunway::COL_OPERATIONS . " = 'ACTIVE'";
        $query .= " ORDER BY ";
        $query .= DbTableAirportRunway::COL_LENGTH . " DESC,";
        $query .= DbTableAirportRunway::COL_SURFACE . " ASC,";
        $query .= DbTableAirportRunway::COL_ID . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading runways for airport id " . $airportId);

        return DbAirportRunwayConverter::fromDbResult($result);
    }
}
