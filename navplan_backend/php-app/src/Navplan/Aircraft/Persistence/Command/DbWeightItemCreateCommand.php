<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


readonly class DbWeightItemCreateCommand implements IWeightItemCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(int $aircraftId, array $weightItems): void
    {
        foreach ($weightItems as $weightItem) {
            $query = $this->createSingleEntrySqlQuery($aircraftId, $weightItem);
            $this->dbService->execCUDQuery($query, "error inserting weight item");
        }
    }


    private function createSingleEntrySqlQuery(int $aircraftId, WeightItem $weightItem): string
    {
        $query = "INSERT INTO " . DbTableAircraftWeightItems::TABLE_NAME . " (" . join(",", [
                DbTableAircraftWeightItems::COL_ID_AIRCRAFT,
                DbTableAircraftWeightItems::COL_TYPE,
                DbTableAircraftWeightItems::COL_NAME,
                DbTableAircraftWeightItems::COL_ARM_LONG,
                DbTableAircraftWeightItems::COL_ARM_LAT,
                DbTableAircraftWeightItems::COL_ARM_UNIT,
                DbTableAircraftWeightItems::COL_MAX_WEIGHT,
                DbTableAircraftWeightItems::COL_DEFAULT_WEIGHT,
                DbTableAircraftWeightItems::COL_WEIGHT_UNIT,
                DbTableAircraftWeightItems::COL_MAX_FUEL,
                DbTableAircraftWeightItems::COL_DEFAULT_FUEL,
                DbTableAircraftWeightItems::COL_FUEL_UNIT
            ]);
        $query .= ") VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($aircraftId),
            DbHelper::getDbStringValue($this->dbService, $weightItem->type->value),
            DbHelper::getDbStringValue($this->dbService, $weightItem->name),
            DbHelper::getDbFloatValue($weightItem->armLong->value),
            DbHelper::getDbFloatValue($weightItem->armLat->value),
            DbHelper::getDbStringValue($this->dbService, $weightItem->armLong->unit->value),
            DbHelper::getDbFloatValue($weightItem->maxWeight?->value),
            DbHelper::getDbFloatValue($weightItem->defaultWeight?->value),
            DbHelper::getDbStringValue($this->dbService, $weightItem->maxWeight
                ? $weightItem->maxWeight->unit->value
                : $weightItem->defaultWeight?->unit->value),
            DbHelper::getDbFloatValue($weightItem->maxFuel?->value),
            DbHelper::getDbFloatValue($weightItem->defaultFuel?->value),
            DbHelper::getDbStringValue($this->dbService, $weightItem->maxFuel
                ? $weightItem->maxFuel->unit->value
                : $weightItem->defaultFuel?->unit->value)
        ));
        $query .= ")";

        return $query;
    }
}
