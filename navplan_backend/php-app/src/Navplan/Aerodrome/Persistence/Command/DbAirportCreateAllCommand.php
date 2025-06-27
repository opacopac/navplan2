<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Command;

use Navplan\Aerodrome\Domain\Command\IAirportCreateAllCommand;
use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRadioConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbAirportCreateAllCommand implements IAirportCreateAllCommand
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    /**
     * @param Airport[] $airports
     * @return void
     * @throws Throwable
     */
    public function createAll(array $airports): void
    {
        $airport_statement = DbAirportConverter::prepareInsertStatement($this->dbService);

        foreach ($airports as $airport) {
            try {
                DbAirportConverter::bindInsertStatement($airport, $airport_statement);
                $airport_statement->execute();
                $airport_id = $airport_statement->getInsertId();

                // radios
                if ($airport->hasRadios()) {
                    $radio_statement = DbAirportRadioConverter::prepareInsertStatement($this->dbService);

                    foreach ($airport->radios as $radio) {
                        DbAirportRadioConverter::bindInsertStatement($radio, $airport_id, $radio_statement);
                        $radio_statement->execute();
                    }
                }

                // runways
                if ($airport->hasRunways()) {
                    $rwy_statement = DbAirportRunwayConverter::prepareInsertStatement($this->dbService);

                    foreach ($airport->runways as $rwy) {
                        DbAirportRunwayConverter::bindInsertStatement($rwy, $airport_id, $rwy_statement);
                        $rwy_statement->execute();
                    }
                }
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting airport '" . $airport->name . "'");
                throw $ex;
            }
        }
    }
}
