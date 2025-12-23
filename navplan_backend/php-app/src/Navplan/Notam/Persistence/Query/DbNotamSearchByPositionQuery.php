<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Airspace\Persistence\Model\DbTableFir;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
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


readonly class DbNotamSearchByPositionQuery implements INotamSearchByPositionQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByPosition(Position2d $position, TimestampInterval $interval): array
    {
        $t = new DbTableNotam('ntm');
        $tGeo = new DbTableNotamGeometry('geo');
        $tAd = new DbTableAirport('ad');
        $tFir = new DbTableFir('fir');

        $maxTimestampStr = DbHelper::getDbUtcTimeString($interval->end->toMs());
        $minTimestampStr = DbHelper::getDbUtcTimeString($interval->start->toMs());

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colId(),
                $t->colNotam(),
                "ad.name as ad_name", // TODO: add support for table aliases in query builder
                "fir.name as fir_name"
            )
            ->join(DbJoinType::INNER, $tGeo, $tGeo->colIcaoNotamId(), $t->colId())
            ->join(DbJoinType::LEFT, $tAd, $tAd->colId(), $t->colIcao())
            ->join(DbJoinType::LEFT, $tFir, $tFir->colIcao(), $t->colIcao())
            ->where(DbCondMulti::all(
                DbCondSimple::create($t->colStartDate(), DbCondOp::LT_OR_E, $maxTimestampStr),
                DbCondSimple::create($t->colEndDate(), DbCondOp::GT_OR_E, $minTimestampStr),
                DbCondMulti::any(
                    DbCondSimple::equals($tGeo->colZoomMax(), 255),
                    DbCondSimple::equals($tGeo->colZoomMax(), null)
                ),
                DbCondGeo::create($tGeo->colExtent(), DbCondOpGeo::INTERSECTS_ST, $position)
            ))
            ->orderBy($t->colStartDate(), DbSortOrder::DESC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching notams by position");

        return DbNotamResultHelper::readNotamFromResultList($result);
    }
}
