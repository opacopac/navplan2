<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase\SearchNotam;

use Navplan\Common\DomainModel\Extent2d;


class ReadNotamByExtentRequest {
    public function __construct(
        public Extent2d $extent,
        public int $zoom,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }
}
