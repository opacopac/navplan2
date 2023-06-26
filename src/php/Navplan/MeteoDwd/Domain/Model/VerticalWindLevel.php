<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\Speed;

class VerticalWindLevel {
    public function __construct(
        public Altitude $altitude,
        public Angle $direction,
        public Speed $speed
    ) {
    }
}
