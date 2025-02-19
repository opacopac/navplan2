<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbDistancePerformanceTableCreateCommand implements IDistancePerformanceTableCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(int $aircraftId, PerfDistTableType $tableType, DistancePerformanceTable $perfTable)
    {
        $query = "INSERT INTO " . DbTableAircraftPerfDist::TABLE_NAME . " (" . join(",", [
                DbTableAircraftPerfDist::COL_ID_AIRCRAFT,
                DbTableAircraftPerfDist::COL_TYPE,
                DbTableAircraftPerfDist::COL_PROFILE_NAME,
                DbTableAircraftPerfDist::COL_ALT_REF,
                DbTableAircraftPerfDist::COL_ALT_STEPS,
                DbTableAircraftPerfDist::COL_ALT_UNIT,
                DbTableAircraftPerfDist::COL_TEMP_REF,
                DbTableAircraftPerfDist::COL_TEMP_STEPS,
                DbTableAircraftPerfDist::COL_TEMP_UNIT,
                DbTableAircraftPerfDist::COL_DISTANCES,
                DbTableAircraftPerfDist::COL_DISTANCE_UNIT,
                DbTableAircraftPerfDist::COL_HEADWIND_DEC_PERC,
                DbTableAircraftPerfDist::COL_HEADWIND_DEC_PER_SPEED,
                DbTableAircraftPerfDist::COL_TAILWIND_INC_PERC,
                DbTableAircraftPerfDist::COL_TAILWIND_INC_PER_SPEED,
                DbTableAircraftPerfDist::COL_SPEED_UNIT,
                DbTableAircraftPerfDist::COL_GRASS_RWY_INC_PERC,
                DbTableAircraftPerfDist::COL_WET_RWY_INC_PERC,
            ]);
        $query .= ") VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($aircraftId),
            DbHelper::getDbStringValue($this->dbService, $tableType->value),
            DbHelper::getDbStringValue($this->dbService, $perfTable->profileName),
            DbHelper::getDbStringValue($this->dbService, $perfTable->altitudeReference->value),
            DbHelper::getDbStringValue($this->dbService, self::createAltitudeStepsJsonString($perfTable->altitudeSteps)),
            DbHelper::getDbStringValue($this->dbService, $perfTable->altitudeSteps[0]->unit->value),
            DbHelper::getDbStringValue($this->dbService, $perfTable->temperatureReference->value),
            DbHelper::getDbStringValue($this->dbService, self::createTemperatureStepsJsonString($perfTable->temperatureSteps)),
            DbHelper::getDbStringValue($this->dbService, $perfTable->temperatureSteps[0]->unit->value),
            DbHelper::getDbStringValue($this->dbService, self::createDistanceValuesJsonString($perfTable->distanceValues)),
            DbHelper::getDbStringValue($this->dbService, $perfTable->distanceValues[0][0]->unit->value),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->headwindDecPercent),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->headwindDecPerSpeed->value),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->tailwindIncPercent),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->tailwindIncPerSpeed->value),
            DbHelper::getDbStringValue($this->dbService, $perfTable->correctionFactors->headwindDecPerSpeed->unit->value),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->grassRwyIncPercent),
            DbHelper::getDbFloatValue($perfTable->correctionFactors->wetRwyIncPercent),
        ));
        $query .= ")";

        $this->dbService->execCUDQuery($query, "error inserting distance performance table");
    }


    /**
     * @param Length[] $altitudeSteps
     * @return string
     */
    private static function createAltitudeStepsJsonString(array $altitudeSteps): string
    {
        return json_encode(
            array_map(function (Length $value) {
                return $value->value;
            }, $altitudeSteps)
        );
    }


    /**
     * @param Temperature[] $temperatureSteps
     * @return string
     */
    private static function createTemperatureStepsJsonString(array $temperatureSteps): string
    {
        return json_encode(
            array_map(function (Temperature $value) {
                return $value->value;
            }, $temperatureSteps)
        );
    }


    /**
     * @param Length[][] $distances
     * @return string
     */
    private static function createDistanceValuesJsonString(array $distances): string
    {
        return json_encode(
            array_map(function (array $value) {
                return array_map(function (Length $value) {
                    return $value->value;
                }, $value);
            }, $distances)
        );
    }
}
