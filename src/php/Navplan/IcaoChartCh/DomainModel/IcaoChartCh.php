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

        if ($pxX < 0 || $pxY < 0 || $pxX > $this->image->getWidth() || $pxY > $this->image->getHeight()) {
            return null;
        }

        return $this->image->getPixelColor($pxX, $pxY);
    }


    private function calcResolution() {
        $pxDiffX = $this->pixelPos2->x - $this->pixelPos1->x;
        $pxDiffY = $this->pixelPos2->y - $this->pixelPos1->y;
        $coordDiffE = $this->chCoordinate2->east - $this->chCoordinate1->east;
        $coordDiffN = $this->chCoordinate2->north - $this->chCoordinate1->north;
        $this->xCoordPerPixel = $coordDiffE / $pxDiffX;
        $this->yCoordPerPixel = $coordDiffN / $pxDiffY;
    }
}
