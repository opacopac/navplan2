<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Query\IAirportByPositionQuery;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;


readonly class DbAirportByPositionQuery implements IAirportByPositionQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return Airport[]
     */
    public function search(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        $t = new DbTableAirport();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondGeo::inMaxDist(
                $t->colLatitude(),
                $t->colLongitude(),
                $position,
                $maxRadius_deg
            ))
            ->orderByLatLonDist(DbTableAirport::COL_LATITUDE, DbTableAirport::COL_LONGITUDE, $position)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by position");
        $converter = new DbAirportConverter($t);

        return $converter->fromDbResult($result);
    }
}
