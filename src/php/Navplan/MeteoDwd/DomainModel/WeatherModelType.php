<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use InvalidArgumentException;


class WeatherModelType {
    const ICON_D2 = 1;
    const ICON_EU = 2;
    const ICON = 3;


    public static function fromString(string $modelString): int {
        return match (trim(strtoupper($modelString))) {
            'ICON_D2' => self::ICON_D2,
            'ICON_EU' => self::ICON_EU,
            'ICON' => self::ICON,
            default => throw new InvalidArgumentException('unknown weather model ' . $modelString),
        };
    }


    public static function toString(int $weatherModel): string {
        return match ($weatherModel) {
            self::ICON_D2 => 'ICON_D2',
            self::ICON_EU => 'ICON_EU',
            self::ICON => 'ICON',
            default => throw new InvalidArgumentException('unknown weather model ' . $weatherModel),
        };
    }
}
