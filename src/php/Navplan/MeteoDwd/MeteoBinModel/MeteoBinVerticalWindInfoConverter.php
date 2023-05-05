<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Speed;
use Navplan\Common\DomainModel\SpeedUnit;
use Navplan\MeteoDwd\DomainModel\VerticalWindColumn;
use Navplan\MeteoDwd\DomainModel\VerticalWindLevel;


class MeteoBinVerticalWindInfoConverter {
    private const NONE_VALUE = 0xFF;


    public static function verticalWindColumnFrom(string $binValues, Length $horDist): VerticalWindColumn {
        $verticalWindLevels = [];

        for ($i = 0; $i < strlen($binValues); $i += 3) {
            $verticalWindLevels[] = self::verticalWindLevelFrom($binValues[$i], $binValues[$i + 1], $binValues[$i + 2]);
        }

        return new VerticalWindColumn($horDist, $verticalWindLevels);
    }


    private static function verticalWindLevelFrom(
        string $binValueAlt,
        string $binValueWindU,
        string $binValueWindV
    ): ?VerticalWindLevel {
        $valueAlt = ord($binValueAlt);

        if ($valueAlt === self::NONE_VALUE || $binValueWindU === self::NONE_VALUE || $binValueWindV === self::NONE_VALUE) {
            return null;
        }

        $valueWindUMps = ord($binValueWindU) - 128;
        $valueWindVMps = ord($binValueWindV) - 128;

        $speedKt = round(sqrt($valueWindUMps * $valueWindUMps + $valueWindVMps * $valueWindVMps), 1);
        $directionDeg = round(atan2($valueWindVMps, $valueWindUMps) / pi() * 180, 1);
        $directionDeg2 = (360 - $directionDeg + 270) % 360;

        return new VerticalWindLevel(
            Altitude::fromFtAmsl($valueAlt * 100),
            new Angle($directionDeg2, AngleUnit::DEG),
            new Speed($speedKt, SpeedUnit::KT)
        );
    }
}
