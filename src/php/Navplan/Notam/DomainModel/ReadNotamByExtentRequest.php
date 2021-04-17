<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;

use Navplan\Geometry\DomainModel\Extent;


class ReadNotamByExtentRequest {
    public function __construct(
        public Extent $extent,
        public int $zoom,
        public ?int $minNotamTimestamp,
        public ?int $maxNotamTimestamp
    ) {
    }
}
