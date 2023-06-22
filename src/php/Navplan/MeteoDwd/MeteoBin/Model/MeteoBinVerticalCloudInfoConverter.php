<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBin\Model;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Length;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumn;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudLevel;


class MeteoBinVerticalCloudInfoConverter {
    private const NONE_VALUE = 0xFF;


    public static function verticalCloudColumnFrom(string $binValues, Length $horDist): VerticalCloudColumn {
        $verticalCloudLevels = [];

        for ($i = 0; $i < strlen($binValues); $i += 2) {
            $verticalCloudLevels[] = self::verticalCloudLevelFrom($binValues[$i], $binValues[$i + 1]);
        }

        return new VerticalCloudColumn($horDist, $verticalCloudLevels);
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
