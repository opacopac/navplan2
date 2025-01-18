<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\StringNumberHelper;


class DbLengthConverter
{
    public static function fromDbRow(
        array $row,
        string $valueColName,
        string $unitColName,
        ?Length $defaultLength = null
    ): ?Length
    {
        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultLength
            : new Length(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                LengthUnit::from($row[$unitColName])
            );
    }
}
