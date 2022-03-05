<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh;


class PixelCoordinate {
    public function __construct(
        public int $pixelX,
        public int $pixelY,
        public Ch1903Coordinate $coordinate
    ) {
    }
}
