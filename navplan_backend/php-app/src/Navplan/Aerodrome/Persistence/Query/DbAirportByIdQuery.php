<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByIdQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAirportByIdQuery implements IAirportByIdQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(int $id): Airport
    {
        $t = new DbTableAirport();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->whereEquals($t->colId(), $id)
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by id $id");
        $converter = new DbAirportConverter($t);

        return $converter->fromDbRow($result->fetch_assoc());
    }
}
