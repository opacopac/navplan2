<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


class LatLon {
    private $lat;
    private $lon;


    public function getLat(): float {
        return $this->lat;
    }


    public function getLon(): float {
        return $this->lon;
    }


    public function __construct(
        float $lat,
        float $lon
    ) {
        $this->lat = $lat;
        $this->lon = $lon;
    }
}
