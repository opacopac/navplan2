<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Time;


interface IOgnService {
    public function setFilter(int $sessionId, Extent2d $extent, Time $maxAge);

    public function readTraffic(int $sessionId): array;
}
