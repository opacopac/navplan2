<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\TimestampInterval;


class NotamPositionRequest {
    public function __construct(
        public Position2d $position,
        public TimestampInterval $interval
    ) {
    }
}

