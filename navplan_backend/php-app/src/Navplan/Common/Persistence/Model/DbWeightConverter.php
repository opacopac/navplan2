<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;


class DbWeightConverter
{
    public static function fromDbRow(
        array $row,
        DBCol|string $valueCol,
        DBCol|string $unitCol,
        ?Weight $defaultWeight = null
    ): ?Weight
    {
        $valueColName = $valueCol instanceof DBCol ? $valueCol->getName() : $valueCol;
        $unitColName = $unitCol instanceof DBCol ? $unitCol->getName() : $unitCol;

        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultWeight
            : new Weight(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                WeightUnit::from($row[$unitColName])
            );
    }
}
