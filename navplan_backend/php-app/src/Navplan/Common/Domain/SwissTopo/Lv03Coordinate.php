<?php declare(strict_types=1);

namespace Navplan\Common\Domain\SwissTopo;

use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;
use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\Position2d;


class Lv03Coordinate implements GeoCoordinate
{
    public static function fromLatLon(?Position2d $pos): ?Lv03Coordinate
    {
        if ($pos === null) {
            return null;
        }

        $e = SwissTopoService::WgsToChE($pos->latitude, $pos->longitude);
        $n = SwissTopoService::WgsToChN($pos->latitude, $pos->longitude);
        return new Lv03Coordinate($e, $n);
    }


    public function __construct(
        public float $e,
        public float $n
    )
    {
    }


    public function getType(): GeoCoordinateType
    {
        return GeoCoordinateType::LV03;
    }


    public function getE(): float
    {
        return $this->e;
    }


    public function getN(): float
    {
        return $this->n;
    }


    public function toLatLon(): Position2d
    {
        $lat = SwissTopoService::ChToWgsLat($this->e, $this->n);
        $lon = SwissTopoService::ChToWgsLong($this->e, $this->n);
        return new Position2d($lon, $lat);
    }
}
