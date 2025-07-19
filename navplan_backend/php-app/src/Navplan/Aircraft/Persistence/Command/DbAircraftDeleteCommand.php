<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAircraftDeleteCommand implements IAircraftDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWeightItemDeleteCommand $weightItemDeleteCommand,
        private IWnbEnvelopeDeleteCommand $wnbEnvelopeDeleteCommand,
        private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand
    )
    {
    }


    public function delete(int $aircraftId, int $userId)
    {
        // delete performance tables
        $this->distancePerformanceTableDeleteCommand->deleteByAircraft($aircraftId);

        // delete w&b items
        $this->weightItemDeleteCommand->deleteByAircraft($aircraftId);

        // delete wnb envelopes
        $this->wnbEnvelopeDeleteCommand->deleteByAircraft($aircraftId);

        $query = "DELETE FROM " . DbTableAircraft::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraftId);
        $query .= " AND " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting aircraft");
    }
}
