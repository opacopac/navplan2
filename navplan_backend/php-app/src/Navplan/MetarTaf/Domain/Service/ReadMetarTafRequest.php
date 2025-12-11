<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;


class ReadMetarTafRequest {
    public function __construct(
        public Extent2d $extent
    ) {
    }
}
