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
        $query = "SELECT * FROM " . DbTableAirport::TABLE_NAME . " WHERE id = " . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error loading airport by id $id");

        return DbAirportConverter::fromDbRow($result->fetch_assoc());
    }
}
