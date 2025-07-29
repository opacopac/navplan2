<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Domain\Model\WeightItemType;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Volume;
use Navplan\Common\Domain\Model\Weight;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


/*
 * @extends DbEntityConverter<WeightItem>
 */

class DbWeightItemConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAircraftWeightItems $table)
    {
    }


    public function fromDbRow(array $row): WeightItem
    {
        $r = new DbRowAircraftWeightItems($this->table, $row);

        return new WeightItem(
            WeightItemType::from($r->getType()),
            $r->getName(),
            Length::fromValueAndUnitString($r->getArmLong(), $r->getArmUnit()),
            Length::fromValueAndUnitString($r->getArmLat(), $r->getArmUnit()),
            Weight::fromValueAndUnitString($r->getMaxWeight(), $r->getWeightUnit()),
            Volume::fromValueAndUnitString($r->getMaxFuel(), $r->getFuelUnit()),
            Weight::fromValueAndUnitString($r->getDefaultWeight(), $r->getWeightUnit()),
            Volume::fromValueAndUnitString($r->getDefaultFuel(), $r->getFuelUnit()),
        );
    }


    public function bindInsertValues(int $aircraftId, WeightItem $weightItem, IDbInsertCommandBuilder $icb): void
    {
        $icb->setColValue($this->table->colIdAircraft(), $aircraftId)
            ->setColValue($this->table->colType(), $weightItem->type->value)
            ->setColValue($this->table->colName(), $weightItem->name)
            ->setColValue($this->table->colArmLong(), $weightItem->armLong->value)
            ->setColValue($this->table->colArmLat(), $weightItem->armLat->value)
            ->setColValue($this->table->colArmUnit(), $weightItem->armLong->unit->value)
            ->setColValue($this->table->colMaxWeight(), $weightItem->maxWeight?->value)
            ->setColValue($this->table->colDefaultWeight(), $weightItem->defaultWeight?->value)
            ->setColValue($this->table->colWeightUnit(), $weightItem->maxWeight
                ? $weightItem->maxWeight->unit->value
                : $weightItem->defaultWeight?->unit->value
            )
            ->setColValue($this->table->colMaxFuel(), $weightItem->maxFuel?->value)
            ->setColValue($this->table->colDefaultFuel(), $weightItem->defaultFuel?->value)
            ->setColValue($this->table->colFuelUnit(), $weightItem->maxFuel
                ? $weightItem->maxFuel->unit->value
                : $weightItem->defaultFuel?->unit->value
            );
    }
}
