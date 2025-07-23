<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Model\DbAircraftConverter;
use Navplan\Aircraft\Persistence\Model\DbDistancePerformanceTableConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\Aircraft\Persistence\Model\DbWeightItemConverter;
use Navplan\Aircraft\Persistence\Model\DbWnbEnvelopeConverter;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbAircraftByIdQuery implements IAircraftByIdQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(int $aircraftId, int $userId): ?Aircraft
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAircraft::TABLE_NAME)
            ->where()->all(
                DbCondSimple::equals(DbTableAircraft::COL_ID, $aircraftId),
                DbCondSimple::equals(DbTableAircraft::COL_ID_USER, $userId)
            )->end()
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading aircraft");

        $aircraft = DbAircraftConverter::fromDbRow($result->fetch_assoc());
        $this->readAircraftWeightItems($aircraft);
        $this->readAircraftWnbEnvelopes($aircraft);
        $this->readDistancePerformanceTable($aircraft);

        return $aircraft;
    }


    private function readAircraftWeightItems(Aircraft &$aircraft): void
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAircraftWeightItems::TABLE_NAME)
            ->whereEquals(DbTableAircraftWeightItems::COL_ID_AIRCRAFT, $aircraft->id)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft weight items");

        $aircraft->wnbWeightItems = DbWeightItemConverter::fromDbResult($result);
    }


    private function readAircraftWnbEnvelopes(Aircraft &$aircraft): void
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAircraftWnbEnvelopes::TABLE_NAME)
            ->whereEquals(DbTableAircraftWnbEnvelopes::COL_ID_AIRCRAFT, $aircraft->id)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft wnb envelopes");

        $aircraft->wnbLonEnvelopes = DbWnbEnvelopeConverter::fromDbResult($result);
    }


    private function readDistancePerformanceTable(Aircraft &$aircraft): void
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAircraftPerfDist::TABLE_NAME)
            ->whereEquals(DbTableAircraftPerfDist::COL_ID_AIRCRAFT, $aircraft->id)
            ->build();

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
