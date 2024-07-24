<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\Common\StringNumberHelper;


class DbWeightConverter
{
    public static function fromDbRow(
        array $row,
        string $colName,
        WeightUnit $weightUnit,
        ?Weight $defaultWeight = null
    ): ?Weight
    {
        return StringNumberHelper::isNullOrEmpty($row, $colName)
            ? $defaultWeight
            : new Weight(StringNumberHelper::parseFloatOrZero($row, $colName), $weightUnit);
    }
}
