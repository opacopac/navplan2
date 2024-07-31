<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftCreateCommand implements IAircraftCreateCommand
{
    public function __construct(
        private IDbService $dbService,
        private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand,
    )
    {
    }


    public function create(Aircraft $aircraft, int $userId): Aircraft
    {
        // create aircraft
        $query = $this->getAircraftInsertSql($aircraft, $userId);
        $this->dbService->execCUDQuery($query, "error creating aircraft");
        $aircraft->id = $this->dbService->getInsertId();

        // create distance performance tables
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_ROLL, $aircraft->perfTakeoffGroundRoll);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_50FT, $aircraft->perfTakeoffDist50ft);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_ROLL, $aircraft->perfLandingGroundRoll);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_50FT, $aircraft->perfLandingDist50ft);
        return $aircraft;
    }


    private function getAircraftInsertSql(Aircraft $aircraft, int $userId): string
    {
        $query = "INSERT INTO " . DbTableAircraft::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableAircraft::COL_ID_USER,
            DbTableAircraft::COL_VEHICLE_TYPE,
            DbTableAircraft::COL_REGISTRATION,
            DbTableAircraft::COL_ICAO_TYPE,
            DbTableAircraft::COL_CRUISE_SPEED,
            DbTableAircraft::COL_CRUISE_FUEL,
            DbTableAircraft::COL_FUEL_TYPE,
            DbTableAircraft::COL_BEW,
            DbTableAircraft::COL_MTOW
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($this->dbService, $aircraft->vehicleType->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->registration),
            DbHelper::getDbStringValue($this->dbService, $aircraft->icaoType),
            DbHelper::getDbFloatValue($aircraft->cruiseSpeed->getKt()),
            DbHelper::getDbFloatValue($aircraft->cruiseFuel->getLph()),
            DbHelper::getDbIntValue($aircraft->fuelType?->value),
            DbHelper::getDbFloatValue($aircraft->bew?->getKg()),
            DbHelper::getDbFloatValue($aircraft->mtow?->getKg())
        ]);
        $query .= ")";

        return $query;
    }
}
