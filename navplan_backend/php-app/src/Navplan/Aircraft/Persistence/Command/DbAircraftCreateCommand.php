<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbAircraftConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbAircraftCreateCommand implements IAircraftCreateCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWeightItemCreateCommand $weightItemCreateCommand,
        private IWnbEnvelopeCreateCommand $wnbEnvelopeCreateCommand,
        private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand,
    )
    {
    }


    public function create(Aircraft $aircraft, int $userId): Aircraft
    {
        // create aircraft
        $t = new DbTableAircraft();
        $converter = new DbAircraftConverter($t);
        $icb = $this->dbService->getInsertCommandBuilder()->insertInto($t);
        $converter->bindInsertValues($aircraft, $userId, $icb);

        $statement = $icb->buildAndBindStatement();
        $statement->execute("error creating aircraft");
        $aircraft->id = $this->dbService->getInsertId();

        // create w&b weight items
        $this->weightItemCreateCommand->create($aircraft->id, $aircraft->wnbWeightItems);

        // create w&b envelopes
        $this->wnbEnvelopeCreateCommand->create($aircraft->id, $aircraft->wnbLonEnvelopes);

        // create distance performance tables
        if ($aircraft->perfTakeoffGroundRoll) {
            $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_ROLL, $aircraft->perfTakeoffGroundRoll);
        }
        if ($aircraft->perfTakeoffDist50ft) {
            $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_50FT, $aircraft->perfTakeoffDist50ft);
        }
        if ($aircraft->perfLandingGroundRoll) {
            $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_ROLL, $aircraft->perfLandingGroundRoll);
        }
        if ($aircraft->perfLandingDist50ft) {
            $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_50FT, $aircraft->perfLandingDist50ft);
        }

        return $aircraft;
    }
}
