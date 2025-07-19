<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Command;

use Navplan\Aerodrome\Domain\Command\IAirportDeleteAllCommand;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


class DbAirportDeleteAllCommand implements IAirportDeleteAllCommand
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    public function deleteAll(): bool
    {
        $this->loggingService->info("deleting all airports, runways and radios...");

        $query = "TRUNCATE TABLE " . DbTableAirportRunway::TABLE_NAME;
        $result1 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirportRadio::TABLE_NAME;
        $result2 = $this->dbService->execCUDQuery($query);

        $query = "TRUNCATE TABLE " . DbTableAirport::TABLE_NAME;
        $result3 = $this->dbService->execCUDQuery($query);

        return $result1 && $result2 && $result3;
    }
}
