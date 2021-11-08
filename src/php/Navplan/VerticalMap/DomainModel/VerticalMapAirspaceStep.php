<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalMapAirspaceStep {
    public function __construct(
        public int    $stepIdx,
        public Length $topAlt,
        public Length $botAlt
    ) {
    }
}
