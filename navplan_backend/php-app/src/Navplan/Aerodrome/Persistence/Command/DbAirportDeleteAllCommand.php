<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Command;

use Navplan\Aerodrome\Domain\Command\IAirportDeleteAllCommand;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


readonly class DbAirportDeleteAllCommand implements IAirportDeleteAllCommand
{
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    )
    {
    }


    public function deleteAll(): bool
    {
        $this->loggingService->info("deleting all airports, runways and radios...");

        // airport runways
        $tRwy = new DbTableAirportRunway();
        $queryRwy = $this->dbService->getDeleteCommandBuilder()
            ->deleteFrom($tRwy)
            ->build();
        $result1 = $this->dbService->execCUDQuery($queryRwy);

        // airport radios
        $tRad = new DbTableAirportRadio();
        $queryRad = $this->dbService->getDeleteCommandBuilder()
            ->deleteFrom($tRad)
            ->build();
        $result2 = $this->dbService->execCUDQuery($queryRad);

        // airports
        $tAd = new DbTableAirport();
        $queryAd = $this->dbService->getDeleteCommandBuilder()
            ->deleteFrom($tAd)
            ->build();
        $result3 = $this->dbService->execCUDQuery($queryAd);

        return $result1 && $result2 && $result3;
    }
}
