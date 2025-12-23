<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Flightroute\Domain\Model\Flightroute;


class NotamRouteRequest {
    public function __construct(
        public Flightroute $flightroute,
        public Length $maxDistFromRoute,
        public TimestampInterval $interval
    ) {
    }
}

