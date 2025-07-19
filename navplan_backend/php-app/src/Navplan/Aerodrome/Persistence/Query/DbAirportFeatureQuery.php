<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportFeature;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportFeatureConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableMapFeatures;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


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
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableMapFeatures::TABLE_NAME)
            ->whereEquals(DbTableMapFeatures::COL_AD_ICAO, $airportIcao)
            ->orderBy(DbTableMapFeatures::COL_TYPE, DbSortOrder::ASC)
            ->orderBy(DbTableMapFeatures::COL_NAME, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading map features for airport icao " . $airportIcao);

        return DbAirportFeatureConverter::fromDbResult($result);
    }
}
