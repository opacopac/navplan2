<?php declare(strict_types=1);

namespace Navplan\Navaid\DomainModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;


class Navaid {
    public function __construct(
        public int $id,
        public string $type,
        public string $kuerzel,
        public string $name,
        public Position2d $position,
        public Length $elevation,
        public string $frequency,
        public string $unit,
        public float $declination,
        public bool $truenorth
    ) {
    }
}
