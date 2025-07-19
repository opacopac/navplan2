<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaoQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportByIcaoQuery implements IAirportByIcaoQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(string $icao): Airport
    {
        $query = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE icao = " . $this->dbService->escapeAndQuoteString($icao);

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by icao '" . $icao . "'");

        return DbAirportConverter::fromDbRow($result->fetch_assoc());
    }
}
