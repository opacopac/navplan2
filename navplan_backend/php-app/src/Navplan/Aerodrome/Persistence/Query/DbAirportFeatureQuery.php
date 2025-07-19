<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportFeatureConverter;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportFeatureQuery implements IAirportFeatureQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param string $airportIcao
     * @return AirportFeature[]
     */
    public function read(string $airportIcao): array
    {
        $query = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao = " . $this->dbService->escapeAndQuoteString($airportIcao);
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading map features for airport icao " . $airportIcao);

        return DbAirportFeatureConverter::fromDbResult($result);
    }
}
