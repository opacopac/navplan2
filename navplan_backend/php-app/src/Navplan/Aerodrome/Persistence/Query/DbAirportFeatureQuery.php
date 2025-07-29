<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportFeatureConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableMapFeatures;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


readonly class DbAirportFeatureQuery implements IAirportFeatureQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param string $airportIcao
     * @return AirportFeature[]
     */
    public function read(string $airportIcao): array
    {
        $t = new DbTableMapFeatures();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->whereEquals($t->colAdIcao(), $airportIcao)
            ->orderBy($t->colType(), DbSortOrder::ASC)
            ->orderBy($t->colName(), DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading map features for airport icao " . $airportIcao);
        $converter = new DbAirportFeatureConverter($t);

        return $converter->fromDbResult($result);
    }
}
