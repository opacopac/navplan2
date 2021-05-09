<?php declare(strict_types=1);

namespace Navplan\Terrain\UseCase\ReadElevation;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Position3d;


interface IReadElevationUc {
    function read(Position2d $position): ?Position3d;
}
