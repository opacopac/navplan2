<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;

use Navplan\Common\Domain\Model\GeoCoordinate;


class WorldFileInfo
{
    public function __construct(
        public float $xCompPixelWidth,
        public float $yCompPixelWidth,
        public float $xCompPixelHeight,
        public float $yCompPixelHeight,
        public GeoCoordinate $geoCoordTopLeft,
    )
    {
    }
}
