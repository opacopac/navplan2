<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChartConverter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;


class DbAirportChartByAirportQuery implements IAirportChartByAirportQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param string $airportIcao
     * @param int $userId
     * @return AirportChart[]
     */
    public function readList(string $airportIcao, int $userId): array
    {
        $t = new DbTableAirportCharts();
        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                "*", // TODO: query builder
                MySqlDbCaseBuilder::create($this->dbService)
                    ->when(DbCondText::create($t->colName(), DbCondOpTxt::LIKE_PREFIX, "AREA"), "1")
                    ->when(DbCondText::create($t->colName(), DbCondOpTxt::LIKE_PREFIX, "VAC"), "2")
                    ->when(DbCondText::create($t->colName(), DbCondOpTxt::LIKE_PREFIX, "AD INFO"), "3")
                    ->else("4")
                    ->build() . " AS sortorder1"
            )
            ->where(DbCondMulti::all(
                DbCondSimple::equals($t->colAdIcao(), $airportIcao),
                DbCondSimple::equals($t->colActive(), true),
                $userId > 0
                    ? DbCondMulti::create(
                    DbCondCombinator::OR,
                    DbCondSimple::equals($t->colUserId(), $userId),
                    DbCondSimple::equals($t->colUserId(), null)
                )
                    : DbCondSimple::equals($t->colUserId(), null)
            ))
            ->orderBy($t->colSource(), DbSortOrder::ASC)
            ->orderBy("sortorder1", DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading airport chart list");
        $converter = new DbAirportChartConverter($t);

        return $converter->fromDbResult($result);
    }
}
