<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChartConverter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbAirportChartByIdQuery implements IAirportChartByIdQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(int $id, int $userId): AirportChart
    {
        $t = new DbTableAirportCharts();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondMulti::all(
                DbCondSimple::equals($t->colId(), $id),
                DbCondSimple::equals($t->colActive(), true),
                $userId > 0
                    ? DbCondMulti::create(
                    DbCondCombinator::OR,
                    DbCondSimple::equals($t->colUserId(), $userId),
                    DbCondSimple::equals($t->colUserId(), null)
                )
                    : DbCondSimple::equals($t->colUserId(), null)
            ))
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading chart by id");
        $converter = new DbAirportChartConverter($t);

        return $converter->fromDbRow($result->fetch_assoc());
    }
}
