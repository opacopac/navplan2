<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\Speed;

class VerticalWindLevel {
    public function __construct(
        public Altitude $altitude,
        public Angle $direction,
        public Speed $speed
    ) {
    }
}
