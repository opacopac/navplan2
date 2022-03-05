<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh;


class Ch1903Extent {
    public function __construct(
        public Ch1903Coordinate $minCoordinate,
        public Ch1903Coordinate $maxCoordinate,
    ) {
    }
}
