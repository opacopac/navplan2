<?php declare(strict_types=1);

namespace Navplan\Geometry\DomainModel;


class Position4d extends Position3d {
    public function __construct(
        float $longitude,
        float $latitude,
        Altitude $altitude,
        public Timestamp $timestamp
    ) {
        parent::__construct($longitude, $latitude, $altitude);
    }
}
