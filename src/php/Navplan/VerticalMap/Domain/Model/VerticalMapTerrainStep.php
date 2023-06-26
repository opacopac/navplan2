<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Model;

use Navplan\Common\DomainModel\Length;


class VerticalMapTerrainStep {
    public function __construct(
        public Length $elevationAmsl,
        public Length $horDist
    ) {
    }
}
