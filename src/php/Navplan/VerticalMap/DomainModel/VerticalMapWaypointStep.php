<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;


class VerticalMapWaypointStep {
    public function __construct(
        public Position2d $wpPosition,
        public Length $horDist,
        public Length $altitudeAmsl,
    ) {
    }
}
