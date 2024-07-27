<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Domain\Model\WeightItemType;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Volume;
use Navplan\Common\Domain\Model\VolumeUnit;
use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\System\Domain\Model\IDbResult;


class DbWeightItemsConverter
{
    public static function fromDbRow(array $row): WeightItem
    {
        return new WeightItem(
            WeightItemType::from($row[DbTableAircraftWeightItems::COL_TYPE]),
            $row[DbTableAircraftWeightItems::COL_NAME],
            new Length(floatval($row[DbTableAircraftWeightItems::COL_ARM_M]), LengthUnit::FT),
            $row[DbTableAircraftWeightItems::COL_MAX_WEIGHT_KG]
                ? new Weight(floatval($row[DbTableAircraftWeightItems::COL_MAX_WEIGHT_KG]), WeightUnit::KG)
                : null,
            $row[DbTableAircraftWeightItems::COL_MAX_FUEL_L]
                ? new Volume(floatval($row[DbTableAircraftWeightItems::COL_MAX_FUEL_L]), VolumeUnit::L)
                : null
        );
    }


    /**
     * @param IDbResult $result
     * @return WeightItem[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $weightItem = [];
        while ($row = $result->fetch_assoc()) {
            $weightItem[] = DbWeightItemsConverter::fromDbRow($row);
        }

        return $weightItem;
    }
}
