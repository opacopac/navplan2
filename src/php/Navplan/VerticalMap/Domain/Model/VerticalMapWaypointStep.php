<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;


class VerticalMapWaypointStep {
    public function __construct(
        public Position2d $wpPosition,
        public Length $horDist,
        public Length $altitudeAmsl,
    ) {
    }
}
