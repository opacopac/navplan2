<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Command;

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChartConverter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;


readonly class DbAirportChartCreateCommand implements IAirportChartCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(AirportChart $airportChart, int $userId): AirportChart
    {
        $t = new DbTableAirportCharts();
        $converter = new DbAirportChartConverter($t);
        $icb = MySqlDbInsertCommandBuilder::create($this->dbService)
            ->insertInto($t);
        $converter->bindInsertValues($airportChart, $userId, $icb);
        $statement = $icb->buildAndBindStatement();
        $statement->execute();

        $airportChart->id = $this->dbService->getInsertId();

        return $airportChart;
    }
}
