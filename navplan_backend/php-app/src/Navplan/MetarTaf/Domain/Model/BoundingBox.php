<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Domain\Model;


class BoundingBox {
    public function __construct(
        public float $minLon,
        public float $minLat,
        public float $maxLon,
        public float $maxLat
    ) {
    }


    public function toString(): string {
        return $this->minLon . ',' . $this->minLat . ',' . $this->maxLon . ',' . $this->maxLat;
    }
}
