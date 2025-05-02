<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


interface GeoCoordinate
{
    function toLatLon(): Position2d;
}

