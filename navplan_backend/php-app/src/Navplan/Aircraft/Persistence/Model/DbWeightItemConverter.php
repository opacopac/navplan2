<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Domain\Model\WeightItemType;
use Navplan\Common\Persistence\Model\DbLengthConverter;
use Navplan\Common\Persistence\Model\DbVolumeConverter;
use Navplan\Common\Persistence\Model\DbWeightConverter;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbWeightItemConverter
{
    public static function fromDbRow(array $row): WeightItem
    {
        return new WeightItem(
            WeightItemType::from($row[DbTableAircraftWeightItems::COL_TYPE]),
            $row[DbTableAircraftWeightItems::COL_NAME],
            DbLengthConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_ARM_LONG, DbTableAircraftWeightItems::COL_ARM_UNIT),
            DbLengthConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_ARM_LAT, DbTableAircraftWeightItems::COL_ARM_UNIT),
            DbWeightConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_MAX_WEIGHT, DbTableAircraftWeightItems::COL_WEIGHT_UNIT),
            DbVolumeConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_MAX_FUEL, DbTableAircraftWeightItems::COL_FUEL_UNIT),
            DbWeightConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_DEFAULT_WEIGHT, DbTableAircraftWeightItems::COL_WEIGHT_UNIT),
            DbVolumeConverter::fromDbRow($row, DbTableAircraftWeightItems::COL_DEFAULT_FUEL, DbTableAircraftWeightItems::COL_FUEL_UNIT)
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
            $weightItem[] = DbWeightItemConverter::fromDbRow($row);
        }

        return $weightItem;
    }
}
