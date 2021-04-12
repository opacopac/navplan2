<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;


class Position3d extends Position2d {
    public function __construct(
        float $longitude,
        float $latitude,
        public Altitude $altitude
    ) {
        parent::__construct($longitude, $latitude);
    }
}
