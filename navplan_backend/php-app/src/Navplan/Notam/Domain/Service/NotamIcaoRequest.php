<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\TimestampInterval;


class NotamIcaoRequest {
    public function __construct(
        public string $airportIcao,
        public TimestampInterval $interval
    ) {
    }
}

