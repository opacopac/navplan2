<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class Ch1903Coordinate {
    public function __construct(
        public float $east,
        public float $north
    ) {
    }


    public static function fromPos2d(Position2d $position): Ch1903Coordinate {
        return new Ch1903Coordinate(
            Ch1903CoordinateConverter::WGStoCHy($position->latitude, $position->longitude),
            Ch1903CoordinateConverter::WGStoCHx($position->latitude, $position->longitude)
        );
    }


    public function toPos2d(): Position2d {
        return new Position2d(
            Ch1903CoordinateConverter::CHtoWGSlong($this->east, $this->north),
            Ch1903CoordinateConverter::CHtoWGSlat($this->east, $this->north)
        );
    }
}
