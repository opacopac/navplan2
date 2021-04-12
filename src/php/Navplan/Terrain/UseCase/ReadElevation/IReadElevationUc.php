<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase\ReadElevation;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Position3d;


interface IReadElevationUc {
    function read(Position2d $position): ?Position3d;
}
