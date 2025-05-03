<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;

use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;


interface GeoCoordinate
{
    function getType(): GeoCoordinateType;

    function getE(): float;

    function getN(): float;

    function toLatLon(): Position2d;
}

