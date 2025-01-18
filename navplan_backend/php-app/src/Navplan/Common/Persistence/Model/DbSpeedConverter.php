<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;


class DbSpeedConverter
{
    public static function fromDbRow(
        array $row,
        string $valueColName,
        string $unitColName,
        ?Speed $defaultSpeed = null
    ): ?Speed
    {
        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultSpeed
            : new Speed(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                SpeedUnit::from($row[$unitColName])
            );
    }
}
