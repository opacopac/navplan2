<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftUpdateCommand implements IAircraftUpdateCommand
{
    public function __construct(
        private IDbService $dbService,
        private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand,
        private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand
    )
    {
    }


    public
    function update(Aircraft $aircraft, int $userId): Aircraft
    {
        // update route
        $query = $this->getUpdateSql($aircraft, $userId);
        $this->dbService->execCUDQuery($query, "error updating aircraft");

        // update distance performance tables
        $this->distancePerformanceTableDeleteCommand->deleteByAircraft($aircraft->id);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_ROLL, $aircraft->perfTakeoffGroundRoll);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::TKOFF_50FT, $aircraft->perfTakeoffDist50ft);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_ROLL, $aircraft->perfLandingGroundRoll);
        $this->distancePerformanceTableCreateCommand->create($aircraft->id, PerfDistTableType::LANDING_50FT, $aircraft->perfLandingDist50ft);

        return $aircraft;
    }


    public
    function getUpdateSql(Aircraft $aircraft, int $userId): string
    {
        $query = "UPDATE " . DbTableAircraft::TABLE_NAME . " SET ";
        $query .= join(", ", [
            DbTableAircraft::COL_VEHICLE_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->vehicleType->value),
            DbTableAircraft::COL_REGISTRATION . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->registration),
            DbTableAircraft::COL_ICAO_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->icaoType),
            DbTableAircraft::COL_CRUISE_SPEED . "=" . DbHelper::getDbFloatValue($aircraft->cruiseSpeed->getKt()),
            DbTableAircraft::COL_CRUISE_FUEL . "=" . DbHelper::getDbFloatValue($aircraft->cruiseFuel->getLph()),
            DbTableAircraft::COL_FUEL_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->fuelType?->value),
            DbTableAircraft::COL_BEW . "=" . DbHelper::getDbFloatValue($aircraft->bew?->getKg()),
            DbTableAircraft::COL_MTOW . "=" . DbHelper::getDbFloatValue($aircraft->mtow?->getKg())
        ]);
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraft->id);
        $query .= "  AND";
        $query .= " " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        return $query;
    }
}
