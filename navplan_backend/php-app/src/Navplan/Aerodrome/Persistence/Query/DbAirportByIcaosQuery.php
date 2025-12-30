<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaosQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondIn;


readonly class DbAirportByIcaosQuery implements IAirportByIcaosQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param string[] $icaos
     * @return Airport[]
     */
    public function read(array $icaos): array
    {
        if (empty($icaos)) {
            return [];
        }

        $t = new DbTableAirport();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondIn::create($t->colIcao(), $icaos))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error loading airports by icaos");

        if ($result->getNumRows() === 0) {
            return [];
        }

        $converter = new DbAirportConverter($t);
        return $converter->fromDbResult($result);
    }
}


