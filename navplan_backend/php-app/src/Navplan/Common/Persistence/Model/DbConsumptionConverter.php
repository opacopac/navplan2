<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\StringNumberHelper;


class DbConsumptionConverter
{
    public static function fromDbRow(
        array $row,
        string $colNameValue,
        string $colNameUnit,
        ?Consumption $defaultConsumption = null
    ): ?Consumption
    {
        return StringNumberHelper::isNullOrEmpty($row, $colNameValue) || StringNumberHelper::isNullOrEmpty($row, $colNameUnit)
            ? $defaultConsumption
            : new Consumption(
                StringNumberHelper::parseFloatOrZero($row, $colNameValue),
                ConsumptionUnit::from($row[$colNameUnit])
            );
    }
}
