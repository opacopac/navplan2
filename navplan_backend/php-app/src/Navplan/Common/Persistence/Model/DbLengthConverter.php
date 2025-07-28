<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;


class DbLengthConverter
{
    public static function fromDbRow(
        array $row,
        DbCol|string $valueCol,
        DbCol|string $unitCol,
        ?Length $defaultLength = null
    ): ?Length
    {
        $valueColName = $valueCol instanceof DbCol ? $valueCol->getName() : $valueCol;
        $unitColName = $unitCol instanceof DbCol ? $unitCol->getName() : $unitCol;

        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultLength
            : new Length(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                LengthUnit::from($row[$unitColName])
            );
    }
}
