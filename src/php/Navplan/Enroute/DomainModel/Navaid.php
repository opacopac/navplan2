<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\Position2d;


class Navaid {
    public function __construct(
        public int $id,
        public NavaidType $type,
        public string $kuerzel,
        public string $name,
        public Position2d $position,
        public Altitude $elevation,
        public Frequency $frequency,
        public float $declination,
        public bool $isTrueNorth
    ) {
    }
}
