<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class ReadNotamByPositionRequest {
    public function __construct(
        public Position2d $position,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }
}
