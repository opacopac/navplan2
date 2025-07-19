<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
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
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAirportCharts::TABLE_NAME)
            ->whereAll(
                DbCondSimple::create(DbTableAirportCharts::COL_ID, DbCondOp::EQ, $id),
                DbCondSimple::create(DbTableAirportCharts::COL_ACTIVE, DbCondOp::EQ, true),
                $userId > 0
                    ? DbCondMulti::create(
                    DbCondCombinator::OR,
                    DbCondSimple::create(DbTableAirportCharts::COL_USER_ID, DbCondOp::EQ, $userId),
                    DbCondSimple::create(DbTableAirportCharts::COL_USER_ID, DbCondOp::EQ, null)
                )
                    : DbCondSimple::create(DbTableAirportCharts::COL_USER_ID, DbCondOp::EQ, null)
            )
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading chart by id");

        return DbAirportChart2Converter::fromDbRow($result->fetch_assoc());
    }
}
