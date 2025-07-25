<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAircraftUpdateCommand implements IAircraftUpdateCommand
{
    public function __construct(
        private IDbService $dbService,
        private IWeightItemCreateCommand $weightItemCreateCommand,
        private IWeightItemDeleteCommand $weightItemDeleteCommand,
        private IWnbEnvelopeCreateCommand $wnbEnvelopeCreateCommand,
        private IWnbEnvelopeDeleteCommand $wnbEnvelopeDeleteCommand,
        private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand,
        private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand
    )
    {
    }


    public
    function update(Aircraft $aircraft, int $userId): Aircraft
    {
        // update aircraft
        $query = $this->getUpdateSql($aircraft, $userId);
        $this->dbService->execCUDQuery($query, "error updating aircraft");

        // update w&b weight items
        $this->weightItemDeleteCommand->deleteByAircraft($aircraft->id);
        $this->weightItemCreateCommand->create($aircraft->id, $aircraft->wnbWeightItems);

        // update w&b envelopes
        $this->wnbEnvelopeDeleteCommand->deleteByAircraft($aircraft->id);
        $this->wnbEnvelopeCreateCommand->create($aircraft->id, $aircraft->wnbLonEnvelopes);

        // update distance performance tables
        $this->distancePerformanceTableDeleteCommand->deleteByAircraft($aircraft->id);
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


    public
    function getUpdateSql(Aircraft $aircraft, int $userId): string
    {
        $query = "UPDATE " . DbTableAircraft::TABLE_NAME . " SET ";
        $query .= join(", ", [
            DbTableAircraft::COL_VEHICLE_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->vehicleType->value),
            DbTableAircraft::COL_REGISTRATION . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->registration),
            DbTableAircraft::COL_ICAO_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->icaoType),
            DbTableAircraft::COL_CRUISE_SPEED . "=" . DbHelper::getDbFloatValue($aircraft->cruiseSpeed->value),
            DbTableAircraft::COL_SPEED_UNIT . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->cruiseSpeed->unit->value),
            DbTableAircraft::COL_CRUISE_CONSUMPTION . "=" . DbHelper::getDbFloatValue($aircraft->cruiseFuel->value),
            DbTableAircraft::COL_CONSUMPTION_UNIT . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->cruiseFuel->unit->value),
            DbTableAircraft::COL_FUEL_TYPE . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->fuelType?->value),
            DbTableAircraft::COL_BEW . "=" . DbHelper::getDbFloatValue($aircraft->bew?->value),
            DbTableAircraft::COL_MTOW . "=" . DbHelper::getDbFloatValue($aircraft->mtow?->value),
            DbTableAircraft::COL_WEIGHT_UNIT . "=" . DbHelper::getDbStringValue($this->dbService,
                $aircraft->bew ? $aircraft->bew->unit->value : $aircraft->mtow?->unit->value),
            DbTableAircraft::COL_ROC_SEALEVEL . "=" . DbHelper::getDbFloatValue($aircraft->rocSealevel?->value),
            DbTableAircraft::COL_VERTICAL_SPEED_UNIT . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->rocSealevel?->unit->value),
            DbTableAircraft::COL_SERVICE_CEILING . "=" . DbHelper::getDbFloatValue($aircraft->serviceCeiling?->value),
            DbTableAircraft::COL_ALTITUDE_UNIT . "=" . DbHelper::getDbStringValue($this->dbService, $aircraft->serviceCeiling?->unit->value)
        ]);
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraft->id);
        $query .= "  AND";
        $query .= " " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        return $query;
    }
}
