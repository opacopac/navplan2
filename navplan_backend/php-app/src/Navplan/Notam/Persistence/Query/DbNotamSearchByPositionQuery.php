<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Common\Domain\Model\Position2d;
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


class DbNotamSearchByPositionQuery implements INotamSearchByPositionQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp): array
    {
        $t = new DbTableNotam('ntm');
        $tGeo = new DbTableNotamGeometry('geo');

        $maxTimestampStr = DbHelper::getDbUtcTimeString($maxNotamTimestamp);
        $minTimestampStr = DbHelper::getDbUtcTimeString($minNotamTimestamp);

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom($t, $t->colId(), $t->colNotam())
            ->join(DbJoinType::INNER, $tGeo, $tGeo->colIcaoNotamId(), $t->colId())
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
