<?php declare(strict_types=1);

namespace Navplan\Common\Domain\SwissTopo;

use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\Position2d;


class Ch1903Coordinate implements GeoCoordinate
{
    public function __construct(
        public float $e,
        public float $n
    )
    {
    }


    public function getIntE(): int
    {
        return (int) round($this->e);
    }


    public function getIntN(): int
    {
        return (int) round($this->n);
    }


    public function toLatLon(): Position2d
    {
        $lat = SwissTopoService::ChToWgsLat($this->e, $this->n);
        $lon = SwissTopoService::ChToWgsLong($this->e, $this->n);
        return new Position2d($lon, $lat);
    }
}
