<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalMapWaypointStep {
    public function __construct(
        public int    $stepIdx,
        public Length $altitudeAmsl,
    ) {
    }
}
