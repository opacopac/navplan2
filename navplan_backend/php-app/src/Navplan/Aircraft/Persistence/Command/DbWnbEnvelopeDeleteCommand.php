<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbWnbEnvelopeDeleteCommand implements IWnbEnvelopeDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId): void
    {
        $t = new DbTableAircraftWnbEnvelopes();
        $dcb = $this->dbService->getDeleteCommandBuilder();
        $query = $dcb
            ->deleteFrom($t)
            ->whereEquals($t->colIdAircraft(), $aircraftId)
            ->build();

        $this->dbService->execCUDQuery($query, "error deleting wnb envelopes from aircraft");
    }
}
