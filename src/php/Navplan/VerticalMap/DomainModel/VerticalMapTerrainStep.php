<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalMapTerrainStep {
    public function __construct(public Length $elevationAmsl) {
    }
}
