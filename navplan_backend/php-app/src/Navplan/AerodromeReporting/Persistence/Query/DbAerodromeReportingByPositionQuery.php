<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;


class DbAerodromeReportingByPositionQuery implements IAerodromeReportingByPositionQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        $t = new DbTableReportingPoints();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondGeo::inMaxDist(
                $t->colLat(),
                $t->colLon(),
                $position,
                $maxRadius_deg
            ))
            ->orderByLatLonDist(
                $t->colLat(),
                $t->colLon(),
                $position
            )
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by position");

        return DbReportingPointConverter::create()
            ->fromDbResult($result);
    }
}
