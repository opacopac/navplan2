<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\ConsumptionUnit;
use Navplan\Common\StringNumberHelper;


class DbConsumptionConverter
{
    public static function fromDbRow(
        array $row,
        string $colName,
        ConsumptionUnit $consumptionUnit,
        ?Consumption $defaultConsumption = null
    ): ?Consumption
    {
        return StringNumberHelper::isNullOrEmpty($row, $colName)
            ? $defaultConsumption
            : new Consumption(StringNumberHelper::parseFloatOrZero($row, $colName), $consumptionUnit);
    }
}
