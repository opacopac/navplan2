<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;


class XyPair {
    public function __construct(
        public int $x,
        public int $y
    ) {
    }
}
