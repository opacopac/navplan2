<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh;

use Imagick;


class IcaoChartCh {
    private Imagick $im;
    private float $xCoordPerPixel; // E
    private float $yCoordPerPixel; // N


    public function __construct(
        public string $chartFileName,
        public PixelCoordinate $pixelPos1,
        public PixelCoordinate $pixelPos2
    ) {
        $this->im = new Imagick($this->chartFileName);
        $this->calcResolution();
    }


    public function getPixelColor(Ch1903Coordinate $chCoord): ?string {
        $pxX = (int) round(($chCoord->east - $this->pixelPos1->coordinate->east) / $this->xCoordPerPixel) + $this->pixelPos1->pixelX;
        $pxY = (int) round(($chCoord->north - $this->pixelPos1->coordinate->north) / $this->yCoordPerPixel) + $this->pixelPos1->pixelY;
        $imgPixel = $this->im->getImagePixelColor($pxX, $pxY);

        return $imgPixel?->getColorAsString();
    }


    private function calcResolution() {
        $pxDiffX = $this->pixelPos2->pixelX - $this->pixelPos1->pixelX;
        $pxDiffY = $this->pixelPos2->pixelY - $this->pixelPos1->pixelY;
        $coordDiffE = $this->pixelPos2->coordinate->east - $this->pixelPos1->coordinate->east;
        $coordDiffN = $this->pixelPos2->coordinate->north - $this->pixelPos1->coordinate->north;
        $this->xCoordPerPixel = $coordDiffE / $pxDiffX;
        $this->yCoordPerPixel = $coordDiffN / $pxDiffY;
    }
}
