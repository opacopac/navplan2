<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\TimestampInterval;


class NotamExtentRequest {
    public function __construct(
        public Extent2d $extent,
        public int $zoom,
        public TimestampInterval $interval
    ) {
    }
}

