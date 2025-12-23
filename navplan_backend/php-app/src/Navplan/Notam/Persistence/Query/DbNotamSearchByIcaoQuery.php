<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Persistence\Model\DbTableNotam;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


readonly class DbNotamSearchByIcaoQuery implements INotamSearchByIcaoQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByIcao(string $airportIcao, TimestampInterval $interval): array
    {
        $t = new DbTableNotam('ntm');

        $maxTimestampStr = DbHelper::getDbUtcTimeString($interval->end->toMs());
        $minTimestampStr = DbHelper::getDbUtcTimeString($interval->start->toMs());

        $query = $this->dbService->getQueryBuilder()
            ->selectFrom($t, $t->colId(), $t->colNotam())
            ->where(DbCondMulti::all(
                DbCondSimple::equals($t->colIcao(), $airportIcao),
                DbCondSimple::create($t->colStartDate(), DbCondOp::LT_OR_E, $maxTimestampStr),
                DbCondSimple::create($t->colEndDate(), DbCondOp::GT_OR_E, $minTimestampStr)
            ))
            ->orderBy($t->colStartDate(), DbSortOrder::DESC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching notams by icao");

        return DbNotamResultHelper::readNotamFromResultList($result);
    }
}
