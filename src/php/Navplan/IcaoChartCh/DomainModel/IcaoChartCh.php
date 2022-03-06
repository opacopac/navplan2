<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;

use Navplan\System\DomainModel\IImage;


class IcaoChartCh {
    private float $xCoordPerPixel; // E
    private float $yCoordPerPixel; // N


    public function __construct(
        public IImage $image,
        public XyPair $pixelPos1,
        public Ch1903Coordinate $chCoordinate1,
        public XyPair $pixelPos2,
        public Ch1903Coordinate $chCoordinate2
    ) {
        $this->calcResolution();
    }


    public function getPixelColor(Ch1903Coordinate $chCoord): ?string {
        $pxX = (int) round(($chCoord->east - $this->chCoordinate1->east) / $this->xCoordPerPixel) + $this->pixelPos1->x;
        $pxY = (int) round(($chCoord->north - $this->chCoordinate1->north) / $this->yCoordPerPixel) + $this->pixelPos1->y;

        return $this->image->getPixelColor($pxX, $pxY);
    }


    public function getTLCoord(): Ch1903Coordinate {
        return $this->calcCoordByPixel(0, 0);
    }


    public function getBRCoord(): Ch1903Coordinate {
        return $this->calcCoordByPixel($this->image->getWidth() - 1, $this->image->getHeight() - 1);
    }


    private function calcResolution() {
        $pxDiffX = $this->pixelPos2->x - $this->pixelPos1->x;
        $pxDiffY = $this->pixelPos2->y - $this->pixelPos1->y;
        $coordDiffE = $this->chCoordinate2->east - $this->chCoordinate1->east;
        $coordDiffN = $this->chCoordinate2->north - $this->chCoordinate1->north;
        $this->xCoordPerPixel = $coordDiffE / $pxDiffX;
        $this->yCoordPerPixel = $coordDiffN / $pxDiffY;
    }


    private function calcCoordByPixel(int $x, int $y): Ch1903Coordinate {
        $chCoordE = (($x - $this->pixelPos1->x) * $this->xCoordPerPixel) + $this->chCoordinate1->east;
        $chCoordN = (($y - $this->pixelPos1->y) * $this->yCoordPerPixel) + $this->chCoordinate1->north;

        return new Ch1903Coordinate($chCoordE, $chCoordN);
    }
}
