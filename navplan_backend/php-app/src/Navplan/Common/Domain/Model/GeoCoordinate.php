<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


interface GeoCoordinate
{
    function getE(): float;

    function getN(): float;

    function toLatLon(): Position2d;
}

