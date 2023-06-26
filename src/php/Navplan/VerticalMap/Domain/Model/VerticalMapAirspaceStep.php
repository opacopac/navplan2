<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Model;

use Navplan\Common\DomainModel\Length;


class VerticalMapAirspaceStep {
    public function __construct(
        public Length $topAlt,
        public Length $botAlt,
        public Length $horDist
    ) {
    }
}
