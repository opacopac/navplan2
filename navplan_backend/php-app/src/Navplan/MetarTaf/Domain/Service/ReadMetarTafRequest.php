<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Service;

use Navplan\MetarTaf\Domain\Model\BoundingBox;


class ReadMetarTafRequest {
    public function __construct(
        public BoundingBox $bbox
    ) {
    }
}
