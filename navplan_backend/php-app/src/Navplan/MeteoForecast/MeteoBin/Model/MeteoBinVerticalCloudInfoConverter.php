<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\MeteoBin\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Length;
use Navplan\MeteoForecast\Domain\Model\VerticalCloudColumn;
use Navplan\MeteoForecast\Domain\Model\VerticalCloudLevel;


class MeteoBinVerticalCloudInfoConverter
{
    private const NONE_VALUE = 0xFF;


    public static function verticalCloudColumnFrom(string $binValues, Length $horDist): VerticalCloudColumn
    {
        $verticalCloudLevels = [];

        for ($i = 0; $i < strlen($binValues); $i += 2) {
            $verticalCloudLevels[] = self::verticalCloudLevelFrom($binValues[$i], $binValues[$i + 1]);
        }

        return new VerticalCloudColumn($horDist, $verticalCloudLevels);
    }


    private static function verticalCloudLevelFrom(string $binValueAlt, string $binValueCloudPercent): ?VerticalCloudLevel
    {
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
