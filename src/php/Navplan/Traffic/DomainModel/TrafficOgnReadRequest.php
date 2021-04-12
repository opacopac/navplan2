<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Time;


class TrafficOgnReadRequest {
    public function __construct(
        public Extent $extent,
        public Time $maxAge,
        public int $sessionId
    ) {
    }
}
