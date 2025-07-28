<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;


class DbSpeedConverter
{
    public static function fromDbRow(
        array $row,
        DbCol|string $valueCol,
        DbCol|string $unitCol,
        ?Speed $defaultSpeed = null
    ): ?Speed
    {
        $valueColName = $valueCol instanceof DbCol ? $valueCol->getName() : $valueCol;
        $unitColName = $unitCol instanceof DbCol ? $unitCol->getName() : $unitCol;

        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultSpeed
            : new Speed(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                SpeedUnit::from($row[$unitColName])
            );
    }
}
