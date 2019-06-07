<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;

use InvalidArgumentException;


class Position2d implements IGeometry2d {
    /* @var $longitude float */
    public $longitude;
    /* @var $latitude float */
    public $latitude;


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


    public function __construct(float $longitude, float $latitude) {
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }


    public function toString(string $separator = ' '): string {
        return $this->longitude . $separator . $this->latitude;
    }


    public function toArray(): array {
        return [$this->longitude, $this->latitude];
    }
}
