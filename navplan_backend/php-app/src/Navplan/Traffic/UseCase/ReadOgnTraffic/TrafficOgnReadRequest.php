<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadOgnTraffic;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Time;


class TrafficOgnReadRequest {
    public function __construct(
        public Extent2d $extent,
        public Time $maxAge,
        public int $sessionId
    ) {
    }
}
