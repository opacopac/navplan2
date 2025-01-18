<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Volume;
use Navplan\Common\Domain\Model\VolumeUnit;
use Navplan\Common\StringNumberHelper;


class DbVolumeConverter
{
    public static function fromDbRow(
        array $row,
        string $valueColName,
        string $unitColName,
        ?Volume $defaultVolume = null
    ): ?Volume
    {
        return StringNumberHelper::isNullOrEmpty($row, $valueColName) || StringNumberHelper::isNullOrEmpty($row, $unitColName)
            ? $defaultVolume
            : new Volume(
                StringNumberHelper::parseFloatOrZero($row, $valueColName),
                VolumeUnit::from($row[$unitColName])
            );
    }
}
