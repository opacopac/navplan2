<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Command;

use Navplan\AerodromeChart\Domain\Command\IAirportChartDeleteCommand;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbAirportChartDeleteCommand implements IAirportChartDeleteCommand
{
    public function __construct(
        private readonly IDbService $dbService,
    )
    {
    }


    public function delete(int $airportChartId, int $userId): bool
    {
        $t = new DbTableAirportCharts();
        $query = $this->dbService->getDeleteCommandBuilder($t)
            ->deleteFrom($t)
            ->where(
                DbCondMulti::all(
                    DbCondSimple::equals($t->colId(), $airportChartId),
                    DbCondSimple::equals($t->colUserId(), $userId)
                )
            )
            ->build();

        return $this->dbService->execCUDQuery($query, "error deleting airport chart");
    }
}
