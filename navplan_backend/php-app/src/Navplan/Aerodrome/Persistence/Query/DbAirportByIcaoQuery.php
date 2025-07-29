<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaoQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbAirportByIcaoQuery implements IAirportByIcaoQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function read(string $icao): Airport
    {
        $t = new DbTableAirport();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->whereEquals($t->colIcao(), $icao)
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by icao '" . $icao . "'");
        $converter = new DbAirportConverter($t);

        return $converter->fromDbRow($result->fetch_assoc());
    }
}
