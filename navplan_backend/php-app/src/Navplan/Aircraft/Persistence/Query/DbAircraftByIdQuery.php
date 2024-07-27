<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\Domain\Model\User;


class DbAircraftByIdQuery implements IAircraftByIdQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function read(int $aircraftId, User $user): ?Aircraft
    {
        $query = "SELECT * FROM " . DbTableAircraft::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraftId);
        $query .= " AND " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($user->id);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading aircraft");

        $aircraft = DbAircraftConverter::fromDbRow($result->fetch_assoc());
        $this->readAircraftWeightItems($aircraft);
        $this->readAircraftWnbEnvelopes($aircraft);
        $this->readDistancePerformanceTable($aircraft);

        return $aircraft;
    }


    private function readAircraftWeightItems(Aircraft &$aircraft): void
    {
        $query = "SELECT * FROM " . DbTableAircraftWeightItems::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftWeightItems::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraft->id);

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft weight items");

        while ($row = $result->fetch_assoc()) {
            $aircraft->wnbWeightItems[] = DbWeightItemConverter::fromDbRow($row);
        }
    }


    private function readAircraftWnbEnvelopes(Aircraft &$aircraft): void
    {
        $query = "SELECT * FROM " . DbTableAircraftWnbEnvelopes::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftWnbEnvelopes::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraft->id);

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft wnb envelopes");

        while ($row = $result->fetch_assoc()) {
            $aircraft->wnbEnvelopes[] = DbWnbEnvelopeConverter::fromDbRow($row);
        }
    }


    private function readDistancePerformanceTable(Aircraft &$aircraft): void
    {
        $query = "SELECT * FROM " . DbTableAircraftPerfDist::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftPerfDist::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraft->id);

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft distance performance");

        while ($row = $result->fetch_assoc()) {
            $type = $row[DbTableAircraftPerfDist::COL_TYPE];
            $table = DbDistancePerformanceTableConverter::fromDbRow($row);
            switch ($type) {
                case PerfDistTableType::TKOFF_ROLL->value:
                    $aircraft->perfTakeoffGroundRoll = $table;
                    break;
                case PerfDistTableType::TKOFF_50FT->value:
                    $aircraft->perfTakeoffDist50ft = $table;
                    break;
                case PerfDistTableType::LANDING_ROLL->value:
                    $aircraft->perfLandingGroundRoll = $table;
                    break;
                case PerfDistTableType::LANDING_50FT->value:
                    $aircraft->perfLandingDist50ft = $table;
                    break;
            }
        }
    }
}
