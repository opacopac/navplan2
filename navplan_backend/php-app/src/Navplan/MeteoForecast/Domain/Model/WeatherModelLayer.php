<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use InvalidArgumentException;


class WeatherModelLayer {
    const CLOUDS = 1;
    const WIND = 2;


    public static function fromString(string $layerString): int {
        return match (trim(strtoupper($layerString))) {
            'CLOUDS' => self::CLOUDS,
            'WIND' => self::WIND,
            default => throw new InvalidArgumentException('unknown weather layer ' . $layerString),
        };
    }


    public static function toString(int $weatherLayer): string {
        return match ($weatherLayer) {
            self::CLOUDS => 'CLOUDS',
            self::WIND => 'WIND',
            default => throw new InvalidArgumentException('unknown weather layer ' . $weatherLayer),
        };
    }
}
