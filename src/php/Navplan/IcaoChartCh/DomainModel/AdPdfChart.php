<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;

use Navplan\Common\DomainModel\Angle;


class AdPdfChart {
    public function __construct(
        public int $id,
        public string $pdfFilename,
        public int $pdfPage,
        public Angle $pdfRotation,
        public string $outPngFilename
    ) {
    }
}
