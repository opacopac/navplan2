<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbWeightItemCreateCommand implements IWeightItemCreateCommand
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
                DbTableAircraftWeightItems::COL_ARM_LONG_M,
                DbTableAircraftWeightItems::COL_MAX_WEIGHT_KG,
                DbTableAircraftWeightItems::COL_MAX_FUEL_L,
                DbTableAircraftWeightItems::COL_DEFAULT_WEIGHT_KG,
                DbTableAircraftWeightItems::COL_DEFAULT_FUEL_L
            ]);
        $query .= ") VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($aircraftId),
            DbHelper::getDbStringValue($this->dbService, $weightItem->type->value),
            DbHelper::getDbStringValue($this->dbService, $weightItem->name),
            DbHelper::getDbFloatValue($weightItem->armLong->getM()),
            DbHelper::getDbFloatValue($weightItem->maxWeight?->getKg()),
            DbHelper::getDbFloatValue($weightItem->maxFuel?->getL()),
            DbHelper::getDbFloatValue($weightItem->defaultWeight?->getKg()),
            DbHelper::getDbFloatValue($weightItem->defaultFuel?->getL())
        ));
        $query .= ")";

        return $query;
    }
}
