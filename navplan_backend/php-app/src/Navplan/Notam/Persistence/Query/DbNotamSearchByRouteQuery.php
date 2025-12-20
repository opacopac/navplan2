<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Common\GeoHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Persistence\Model\DbTableNotam;
use Navplan\Notam\Persistence\Model\DbTableNotamGeometry;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbJoinType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbColBuilder;


class DbNotamSearchByRouteQuery implements INotamSearchByRouteQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param Flightroute $flightroute
     * @param Length $maxDistFromRoute
     * @param TimestampInterval $interval
     * @return Notam[]
     */
    public function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, TimestampInterval $interval): array
    {
        $waypoints = $flightroute->getWaypointsInclAlternate();

        if (count($waypoints) === 0) {
            return [];
        }

        $posList = array_map(function ($wp) { return $wp->position; }, $waypoints);

        $t = new DbTableNotam('ntm');
        $tGeo = new DbTableNotamGeometry('geo');

        // Build lineboxes for each consecutive waypoint pair
        $lineBoxes = [];
        if (count($posList) === 1) {
            // Single waypoint: create a box around the point
            $lineBoxes[] = GeoHelper::getPointBox($posList[0], $maxDistFromRoute);
        } else {
            // Multiple waypoints: create lineboxes for each segment
            for ($i = 0; $i < count($posList) - 1; $i++) {
                $lineBoxes[] = GeoHelper::getLineBox($posList[$i], $posList[$i + 1], $maxDistFromRoute);
            }
        }

        // Build intersection conditions for all lineboxes
        $intersectionConditions = array_map(
            fn($lineBox) => DbCondGeo::create($tGeo->colExtent(), DbCondOpGeo::INTERSECTS_ST, $lineBox),
            $lineBoxes
        );

        $maxTimestampStr = DbHelper::getDbUtcTimeString($interval->end->toMs());
        $minTimestampStr = DbHelper::getDbUtcTimeString($interval->start->toMs());

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colId(),
                $t->colNotam(),
                $tGeo->colGeometry(),
                "ST_AsText(" . MySqlDbColBuilder::buildColName($tGeo->colExtent()) . ") AS extent"
            )
            ->join(DbJoinType::INNER, $tGeo, $tGeo->colIcaoNotamId(), $t->colId())
            ->where(DbCondMulti::all(
                DbCondSimple::create($t->colStartDate(), DbCondOp::LT_OR_E, $maxTimestampStr),
                DbCondSimple::create($t->colEndDate(), DbCondOp::GT_OR_E,  $minTimestampStr),
                DbCondMulti::any(...$intersectionConditions)
            ))
            ->orderBy($t->colStartDate(), DbSortOrder::DESC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading notams by route");

        return DbNotamResultHelper::readNotamFromResultList($result);
    }
}
