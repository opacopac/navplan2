<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Aerodrome\Domain\Query\IAirportByPositionQuery;
use Navplan\Aerodrome\Persistence\Model\DbShortAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Domain\Service\IDbService;


class DbAirportByPositionQuery implements IAirportByPositionQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return ShortAirport[]
     */
    public function searchShortAirports(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        $query = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableAirport::COL_LATITUDE . " > " . ($position->latitude - $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LATITUDE . " < " . ($position->latitude + $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LONGITUDE . " > " . ($position->longitude - $maxRadius_deg);
        $query .= "   AND " . DbTableAirport::COL_LONGITUDE . " < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((" . DbTableAirport::COL_LATITUDE . " - " . $position->latitude . ") * (" . DbTableAirport::COL_LATITUDE . " - " . $position->latitude .
            ") + (" . DbTableAirport::COL_LONGITUDE . " - " . $position->longitude . ") * (" . DbTableAirport::COL_LONGITUDE . " - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by position");

        return DbShortAirportConverter::fromDbResult($result);
    }
}
