<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Altitude;


class VerticalCloudLevel {
    public function __construct(
        public Altitude $altitude,
        public int $cloudPercent,
    ) {
    }
}
