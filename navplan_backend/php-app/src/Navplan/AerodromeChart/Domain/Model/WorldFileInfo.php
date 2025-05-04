<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;

use Navplan\Common\Domain\Model\GeoCoordinate;


class WorldFileInfo
{
    public function __construct(
        float $xCompPixelWidth,
        float $yCompPixelWidth,
        float $xCompPixelHeight,
        float $yCompPixelHeight,
        GeoCoordinate $geoCoordTopLeft,
    )
    {
    }
}
