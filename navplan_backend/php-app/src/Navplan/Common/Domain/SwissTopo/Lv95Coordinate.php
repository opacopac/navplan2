<?php declare(strict_types=1);

namespace Navplan\Common\Domain\SwissTopo;

use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\Position2d;


class Lv95Coordinate implements GeoCoordinate
{
    public const LV95_TO_LV03_E_OFFSET = 2000000;
    public const LV95_TO_LV93_N_OFFSET = 1000000;


    public static function fromLv03(Lv03Coordinate $lv03): Lv95Coordinate
    {
        $e = $lv03->getE() + self::LV95_TO_LV03_E_OFFSET;
        $n = $lv03->getN() + self::LV95_TO_LV93_N_OFFSET;
        return new Lv95Coordinate($e, $n);
    }


    public function __construct(
        public float $e,
        public float $n
    )
    {
    }


    public function getE(): float
    {
        return $this->e;
    }


    public function getN(): float
    {
        return $this->n;
    }


    public function toLv03(): Lv03Coordinate
    {
        $e = $this->e - self::LV95_TO_LV03_E_OFFSET;
        $n = $this->n - self::LV95_TO_LV93_N_OFFSET;
        return new Lv03Coordinate($e, $n);
    }


    public function toLatLon(): Position2d
    {
        return $this->toLv03()->toLatLon();
    }
}
