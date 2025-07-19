<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRadio;
use Navplan\Aerodrome\Domain\Query\IAirportRadioQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportRadioConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportRadioQuery implements IAirportRadioQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param int $airportId
     * @return AirportRadio[]
     */
    public function read(int $airportId): array
    {
        $query = "SELECT *,";
        $query .= "  (CASE";
        $query .= "    WHEN " . DbTableAirportRadio::COL_CATEGORY . " = 'COMMUNICATION' THEN 1";
        $query .= "    WHEN " . DbTableAirportRadio::COL_CATEGORY . " = 'OTHER' THEN 2";
        $query .= "    WHEN " . DbTableAirportRadio::COL_CATEGORY . " = 'INFORMATION' THEN 3";
        $query .= "    ELSE 4";
        $query .= "  END) AS sortorder1,";
        $query .= "  (CASE";
        $query .= "    WHEN " . DbTableAirportRadio::COL_TYPE . " = 'TOWER' THEN 1";
        $query .= "    WHEN " . DbTableAirportRadio::COL_TYPE . " = 'CTAF' THEN 2";
        $query .= "    WHEN " . DbTableAirportRadio::COL_TYPE . " = 'OTHER' THEN 3";
        $query .= "    ELSE 4";
        $query .= "  END) AS sortorder2";
        $query .= " FROM " . DbTableAirportRadio::TABLE_NAME;
        $query .= " WHERE " . DbTableAirportRadio::COL_AIRPORT_ID . " = " . $airportId;
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= DbTableAirportRadio::COL_FREQUENCY . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading radios for airport id " . $airportId);

        return DbAirportRadioConverter::fromDbResult($result);
    }
}
