<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\Position2d;


interface IAdsbexRepo {
    public function readTraffic(Position2d $position, Length $radius): array;
}
