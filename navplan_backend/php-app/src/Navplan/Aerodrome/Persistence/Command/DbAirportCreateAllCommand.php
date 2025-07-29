<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Command;

use Navplan\Aerodrome\Domain\Command\IAirportCreateAllCommand;
use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Persistence\Model\DbAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRadioConverter;
use Navplan\Aerodrome\Persistence\Model\DbAirportRunwayConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRadio;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


readonly class DbAirportCreateAllCommand implements IAirportCreateAllCommand
{
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
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
        $tAd = new DbTableAirport();
        $tRad = new DbTableAirportRadio();
        $tRwy = new DbTableAirportRunway();
        $convAd = new DbAirportConverter($tAd);
        $convRad = new DbAirportRadioConverter($tRad);
        $convRwy = new DbAirportRunwayConverter($tRwy);
        $icbAd = MySqlDbInsertCommandBuilder::create($this->dbService)->insertInto($tAd);
        $icbRad = MySqlDbInsertCommandBuilder::create($this->dbService)->insertInto($tRad);
        $icbRwy = MySqlDbInsertCommandBuilder::create($this->dbService)->insertInto($tRwy);

        // airports
        foreach ($airports as $airport) {
            try {
                $convAd->bindInsertValues($airport, $icbAd);
                $statAd = $icbAd->buildAndBindStatement();
                $statAd->execute();
                $adId = $statAd->getInsertId();

                // radios
                if ($airport->hasRadios()) {
                    foreach ($airport->radios as $radio) {
                        $convRad->bindInsertValues($radio, $adId, $icbRad);
                        $statRad = $icbRad->buildAndBindStatement();
                        $statRad->execute();
                    }
                }

                // runways
                if ($airport->hasRunways()) {
                    foreach ($airport->runways as $rwy) {
                        $convRwy->bindInsertValues($rwy, $adId, $icbRwy);
                        $statRwy = $icbRwy->buildAndBindStatement();
                        $statRwy->execute();
                    }
                }
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting airport '" . $airport->name . "'");
                throw $ex;
            }
        }
    }
}
