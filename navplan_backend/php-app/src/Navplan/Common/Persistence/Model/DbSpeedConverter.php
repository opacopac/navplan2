<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;


class DbSpeedConverter
{
    public static function fromDbRow(
        array $row,
        string $colName,
        SpeedUnit $speedUnit,
        ?Speed $defaultSpeed = null
    ): ?Speed
    {
        return StringNumberHelper::isNullOrEmpty($row, $colName)
            ? $defaultSpeed
            : new Speed(StringNumberHelper::parseFloatOrZero($row, $colName), $speedUnit);
    }
}
