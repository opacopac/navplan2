<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\DomainModel\VerticalCloudColumn;
use Navplan\MeteoDwd\DomainModel\VerticalCloudLevel;


class MeteoBinVerticalCloudInfoConverter {
    private const NONE_VALUE = 0xFF;


    public static function verticalCloudColumnFrom(string $binValues, Position2d $pos): VerticalCloudColumn {
        $verticalCloudLevels = [];

        for ($i = 0; $i < strlen($binValues); $i += 2) {
            $verticalCloudLevels[] = self::verticalCloudLevelFrom($binValues[$i], $binValues[$i + 1]);
        }

        return new VerticalCloudColumn($pos, $verticalCloudLevels);
    }


    private static function verticalCloudLevelFrom(string $binValueAlt, string $binValueCloudPercent): ?VerticalCloudLevel {
        $valueAlt = ord($binValueAlt);

        if ($valueAlt === self::NONE_VALUE) {
            return null;
        }

        $valueCloudPercent = ord($binValueCloudPercent);

        return new VerticalCloudLevel(
            Altitude::fromFtAmsl($valueAlt * 100),
            $valueCloudPercent === self::NONE_VALUE ? 0 : $valueCloudPercent
        );
    }
}
