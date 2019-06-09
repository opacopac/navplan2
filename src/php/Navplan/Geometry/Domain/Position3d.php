<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;


class Position3d extends Position2d {
    /* @var $altitude Altitude */
    public $altitude;


    public function __construct(float $longitude, float $latitude, Altitude $altitude) {
        parent::__construct($longitude, $latitude);
        $this->altitude = $altitude;
    }
}
