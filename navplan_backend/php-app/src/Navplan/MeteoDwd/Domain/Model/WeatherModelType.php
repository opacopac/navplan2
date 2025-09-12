<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use InvalidArgumentException;


class WeatherModelType {
    const ICON_D2 = 1;
    const ICON_EU = 2;
    const ICON = 3;
    const ICON_CH1 = 4;


    public static function fromString(string $modelString): int {
        return match (trim(strtoupper($modelString))) {
            'ICON_D2' => self::ICON_D2,
            'ICON_EU' => self::ICON_EU,
            'ICON' => self::ICON,
            'ICON_CH1' => self::ICON_CH1,
            default => throw new InvalidArgumentException('unknown weather model ' . $modelString),
        };
    }


    public static function toString(int $weatherModel): string {
        return match ($weatherModel) {
            self::ICON_D2 => 'ICON_D2',
            self::ICON_EU => 'ICON_EU',
            self::ICON => 'ICON',
            self::ICON_CH1 => 'ICON_CH1',
            default => throw new InvalidArgumentException('unknown weather model ' . $weatherModel),
        };
    }
}
