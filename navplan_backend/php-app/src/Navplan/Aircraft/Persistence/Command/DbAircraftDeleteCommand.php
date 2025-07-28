<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


readonly class DbAircraftDeleteCommand implements IAircraftDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWeightItemDeleteCommand $weightItemDeleteCommand,
        private IWnbEnvelopeDeleteCommand $wnbEnvelopeDeleteCommand,
        private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand
    )
    {
    }


    public function delete(int $aircraftId, int $userId): bool
    {
        // delete performance tables
        $this->distancePerformanceTableDeleteCommand->deleteByAircraft($aircraftId);

        // delete w&b items
        $this->weightItemDeleteCommand->deleteByAircraft($aircraftId);

        // delete wnb envelopes
        $this->wnbEnvelopeDeleteCommand->deleteByAircraft($aircraftId);

        $t = new DbTableAircraft();
        $dcb = $this->dbService->getDeleteCommandBuilder();
        $query = $dcb
            ->deleteFrom($t)
            ->where(
                DbCondMulti::all(
                    DbCondSimple::equals($t->colId(), $aircraftId),
                    DbCondSimple::equals($t->colIdUser(), $userId)
                )
            )
            ->build();

        return $this->dbService->execCUDQuery($query, "error deleting aircraft");
    }
}
