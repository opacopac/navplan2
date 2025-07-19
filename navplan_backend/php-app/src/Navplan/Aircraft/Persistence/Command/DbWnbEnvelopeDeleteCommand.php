<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbWnbEnvelopeDeleteCommand implements IWnbEnvelopeDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId): void
    {
        $query = "DELETE FROM " . DbTableAircraftWnbEnvelopes::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftWnbEnvelopes::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraftId);
        $this->dbService->execCUDQuery($query, "error deleting wnb envelopes from aircraft");
    }
}
