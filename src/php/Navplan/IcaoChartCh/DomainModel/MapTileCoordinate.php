<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class MapTileCoordinate {
    public function __construct(
        public int $xtile,
        public int $ytile,
        public int $zoom,
    ) {
    }


    public static function fromPosition(Position2d $position2d, int $zoom): MapTileCoordinate {
        $xtile = (int) floor((($position2d->longitude + 180) / 360) * pow(2, $zoom));
        $ytile = (int) floor((1 - log(tan(deg2rad($position2d->latitude)) + 1 / cos(deg2rad($position2d->latitude))) / pi()) /2 * pow(2, $zoom));

        return new MapTileCoordinate($xtile, $ytile, $zoom);
    }


    public function toPosition(): Position2d {
        $n = pow(2, $this->zoom);
        $lon_deg = $this->xtile / $n * 360.0 - 180.0;
        $lat_deg = rad2deg(atan(sinh(pi() * (1 - 2 * $this->ytile / $n))));

        return new Position2d($lon_deg, $lat_deg);
    }
}
