<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;

use Navplan\Common\DomainModel\Angle;


class AdPdfChart {
    public function __construct(
        public int $id,
        public string $adIcao,
        public string $pdfFilename,
        public int $pdfPage,
        public Angle $pdfRotation,
        public string $outPngFilename,
        public int $regType,
        public ?XyPair $pos1Pixel,
        public ?Ch1903Coordinate $pos1Ch1903Coord,
        public int $chartScale
    ) {
    }
}
