<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;


class Position2d implements IGeometry2d, GeoCoordinate {
    public static function createFromString(string $lonLatString, string $separator = ' '): Position2d {
        $lonLat = explode($separator, trim($lonLatString));
        if (count($lonLat) === 2 && is_numeric(trim($lonLat[0])) && is_numeric(trim($lonLat[1]))) {
            return new Position2d(floatval(trim($lonLat[0])), floatval(trim($lonLat[1])));
        } else {
            throw new InvalidArgumentException('wrong format of position string "' . $lonLatString . '"');
        }
    }


    public static function createFromArray(array $lonLat): Position2d {
        if (count($lonLat) === 2 && is_numeric($lonLat[0]) && is_numeric($lonLat[1])) {
            return new Position2d($lonLat[0], $lonLat[1]);
        } else {
            throw new InvalidArgumentException('array must have 2 numeric elements');
        }
    }


    public function __construct(
        public float $longitude,
        public float $latitude
    ) {
    }


    public function toString(string $separator = ' '): string {
        return $this->longitude . $separator . $this->latitude;
    }


    public function toArray(): array {
        return [$this->longitude, $this->latitude];
    }


    public function equals(Position2d $position): bool {
        return $this->longitude === $position->longitude && $this->latitude === $position->latitude;
    }


    public function getType(): GeoCoordinateType
    {
        return GeoCoordinateType::LAT_LON;
    }


    public function getE(): float
    {
        return $this->longitude;
    }


    public function getN(): float
    {
        return $this->latitude;
    }


    public function toLatLon(): Position2d
    {
        return $this;
    }
}
