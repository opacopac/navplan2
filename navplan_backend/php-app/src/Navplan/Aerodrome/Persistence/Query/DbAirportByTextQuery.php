<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Domain\Service\IDbService;


class DbAirportByTextQuery implements IAirportByTextQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function searchShortAirports(string $searchText, int $maxResults): array
    {
        $searchText = $this->dbService->escapeString($searchText);

        $query = "SELECT *";
        $query .= " FROM " . DbTableAirport::TABLE_NAME;
        $query .= " WHERE";
        $query .= "   " . DbTableAirport::COL_ICAO . " LIKE '" . $searchText . "%'";
        $query .= "   OR " . DbTableAirport::COL_NAME . " LIKE '" . $searchText . "%'";
        $query .= " ORDER BY";
        $query .= "   CASE WHEN " . DbTableAirport::COL_COUNTRY . " = 'CH' THEN 1 ELSE 2 END ASC,";
        $query .= "   CASE WHEN ISNULL(" . DbTableAirport::COL_ICAO . ") OR " . DbTableAirport::COL_ICAO . " = '' THEN 2 ELSE 1 END ASC,";
        $query .= "   CASE WHEN " . DbTableAirport::COL_TYPE . " = 'INTL_APT' THEN 1";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'APT' OR " . DbTableAirport::COL_TYPE . " = 'AF_CIVIL' OR type = 'AF_MIL_CIVIL' OR type = 'AF_WATER' OR type = 'AD_MIL' THEN 2";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'GLIDING' OR " . DbTableAirport::COL_TYPE . " = 'LIGHT_AIRCRAFT' THEN 3";
        $query .= "        WHEN " . DbTableAirport::COL_TYPE . " = 'HELI_CIVIL' OR " . DbTableAirport::COL_TYPE . " = 'HELI_MIL' THEN 4";
        $query .= "        ELSE 5 END ASC,";
        $query .= "   " . DbTableAirport::COL_ICAO . " ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by text");

        return DbAirportConverter::fromDbResult($result);
    }
}
