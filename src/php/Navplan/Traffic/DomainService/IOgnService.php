<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainService;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Time;


interface IOgnService {
    public function setFilter(int $sessionId, Extent $extent, Time $maxAge);

    public function readTraffic(int $sessionId): array;
}
