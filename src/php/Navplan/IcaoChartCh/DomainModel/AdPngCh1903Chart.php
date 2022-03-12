<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;


class AdPngCh1903Chart {
    public function __construct(
        public int $id,
        public string $adIcao,
        public string $pngFilename,
        public int $regType,
        public ?XyPair $pos1Pixel,
        public ?Ch1903Coordinate $pos1Ch1903Coord,
        public int $chartScale,
        public string $outPngFilename
    ) {
    }
}
