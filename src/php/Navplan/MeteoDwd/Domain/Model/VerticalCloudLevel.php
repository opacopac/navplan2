<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;


class VerticalCloudLevel {
    public function __construct(
        public Altitude $altitude,
        public int $cloudPercent,
    ) {
    }
}
