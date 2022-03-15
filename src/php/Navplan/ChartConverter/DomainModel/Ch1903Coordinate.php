<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class Ch1903Coordinate {
    public function __construct(
        public float $east,
        public float $north
    ) {
    }


    public static function fromLonLat(float $longitude, float $latitude): Ch1903Coordinate {
        return new Ch1903Coordinate(
            Ch1903CoordinateConverter::WGStoCHy($latitude, $longitude),
            Ch1903CoordinateConverter::WGStoCHx($latitude, $longitude)
        );
    }


    public static function fromPos2d(Position2d $position): Ch1903Coordinate {
        return self::fromLonLat($position->longitude, $position->latitude);
    }


    public function toPos2d(): Position2d {
        return new Position2d(
            Ch1903CoordinateConverter::CHtoWGSlong($this->east, $this->north),
            Ch1903CoordinateConverter::CHtoWGSlat($this->east, $this->north)
        );
    }
}
