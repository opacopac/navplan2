<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAircraftCreateCommand implements IAircraftCreateCommand
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
        $query = $this->getAircraftInsertSql($aircraft, $userId);
        $this->dbService->execCUDQuery($query, "error creating aircraft");
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


    private function getAircraftInsertSql(Aircraft $aircraft, int $userId): string
    {
        $query = "INSERT INTO " . DbTableAircraft::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableAircraft::COL_ID_USER,
            DbTableAircraft::COL_VEHICLE_TYPE,
            DbTableAircraft::COL_REGISTRATION,
            DbTableAircraft::COL_ICAO_TYPE,
            DbTableAircraft::COL_CRUISE_SPEED,
            DbTableAircraft::COL_SPEED_UNIT,
            DbTableAircraft::COL_CRUISE_CONSUMPTION,
            DbTableAircraft::COL_CONSUMPTION_UNIT,
            DbTableAircraft::COL_FUEL_TYPE,
            DbTableAircraft::COL_BEW,
            DbTableAircraft::COL_MTOW,
            DbTableAircraft::COL_WEIGHT_UNIT,
            DbTableAircraft::COL_ROC_SEALEVEL,
            DbTableAircraft::COL_VERTICAL_SPEED_UNIT,
            DbTableAircraft::COL_SERVICE_CEILING,
            DbTableAircraft::COL_ALTITUDE_UNIT
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($this->dbService, $aircraft->vehicleType->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->registration),
            DbHelper::getDbStringValue($this->dbService, $aircraft->icaoType),
            DbHelper::getDbFloatValue($aircraft->cruiseSpeed->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->cruiseSpeed->unit->value),
            DbHelper::getDbFloatValue($aircraft->cruiseFuel->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->cruiseFuel->unit->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->fuelType?->value),
            DbHelper::getDbFloatValue($aircraft->bew?->value),
            DbHelper::getDbFloatValue($aircraft->mtow?->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->mtow ? $aircraft->mtow->unit->value : $aircraft->bew?->unit->value),
            DbHelper::getDbFloatValue($aircraft->rocSealevel?->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->rocSealevel?->unit->value),
            DbHelper::getDbFloatValue($aircraft->serviceCeiling?->value),
            DbHelper::getDbStringValue($this->dbService, $aircraft->serviceCeiling?->unit->value)
        ]);
        $query .= ")";

        return $query;
    }
}
