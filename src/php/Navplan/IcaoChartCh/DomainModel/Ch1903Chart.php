<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainModel;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainModel\IImage;


class Ch1903Chart {
    private float $xCoordPerPixel; // E
    private float $yCoordPerPixel; // N


    private function __construct(
        public IImage $image,
        private XyPair $pixelPos1,
        private Ch1903Coordinate $chCoordinate1
    ) {
    }


    public static function fromPos1AndPos2(
        IImage $image,
        XyPair $pixelPos1,
        Ch1903Coordinate $chCoordinate1,
        XyPair $pixelPos2,
        Ch1903Coordinate $chCoordinate2
    ): Ch1903Chart {
        $chart = new Ch1903Chart($image, $pixelPos1, $chCoordinate1);
        $pxDiffX = $pixelPos2->x - $pixelPos1->x;
        $pxDiffY = $pixelPos2->y - $pixelPos1->y;
        $coordDiffE = $chCoordinate2->east - $chCoordinate1->east;
        $coordDiffN = $chCoordinate2->north - $chCoordinate1->north;
        $chart->xCoordPerPixel = $coordDiffE / $pxDiffX;
        $chart->yCoordPerPixel = $coordDiffN / $pxDiffY;

        return $chart;
    }


    public static function fromPosAndScale(
        IImage $image,
        XyPair $pixelPos1,
        Ch1903Coordinate $chCoordinate1,
        int $chartScale,
        float $resolutionDpi
    ): Ch1903Chart {
        $chart = new Ch1903Chart($image, $pixelPos1, $chCoordinate1);
        $width_mm = $image->getWidth() / $resolutionDpi * Length::MM_PER_INCH;
        $height_mm = $image->getHeight() / $resolutionDpi * Length::MM_PER_INCH;
        $chart->xCoordPerPixel = $width_mm / $image->getWidth() / 1000 * $chartScale;
        $chart->yCoordPerPixel = -$height_mm / $image->getHeight() / 1000 * $chartScale;

        return $chart;
    }


    public function getPixelColor(Ch1903Coordinate $chCoord): ?array {
        $pxX = ($chCoord->east - $this->chCoordinate1->east) / $this->xCoordPerPixel + $this->pixelPos1->x;
        $pxY = ($chCoord->north - $this->chCoordinate1->north) / $this->yCoordPerPixel + $this->pixelPos1->y;

        return $this->image->getPixelColor($pxX, $pxY);
    }


    public function getTLCoord(): Ch1903Coordinate {
        return $this->calcCoordByPixel(0, 0);
    }


    public function getBRCoord(): Ch1903Coordinate {
        return $this->calcCoordByPixel($this->image->getWidth() - 1, $this->image->getHeight() - 1);
    }


    public function calcLatLonExtent(): Extent2d {
        $pos0 = $this->getTLCoord()->toPos2d();
        $minLon = $pos0->longitude;
        $minLat = $pos0->latitude;
        $maxLon = $pos0->longitude;
        $maxLat = $pos0->latitude;

        for ($x = 0; $x < $this->image->getWidth(); $x++) {
            $pos1 = $this->calcCoordByPixel($x, 0)->toPos2d();
            $pos2 = $this->calcCoordByPixel($x, $this->image->getHeight() - 1)->toPos2d();
            $minLon = min($pos1->longitude, $pos2->longitude, $minLon);
            $minLat = min($pos1->latitude, $pos2->latitude, $minLat);
            $maxLon = max($pos1->longitude, $pos2->longitude, $maxLon);
            $maxLat = max($pos1->latitude, $pos2->latitude, $maxLat);
        }

        for ($y = 0; $y < $this->image->getHeight(); $y++) {
            $pos1 = $this->calcCoordByPixel(0, $y)->toPos2d();
            $pos2 = $this->calcCoordByPixel($this->image->getWidth() - 1, $y)->toPos2d();
            $minLon = min($pos1->longitude, $pos2->longitude, $minLon);
            $minLat = min($pos1->latitude, $pos2->latitude, $minLat);
            $maxLon = max($pos1->longitude, $pos2->longitude, $maxLon);
            $maxLat = max($pos1->latitude, $pos2->latitude, $maxLat);
        }

        return new Extent2d(
            new Position2d($minLon, $minLat),
            new Position2d($maxLon, $maxLat)
        );
    }


    private function calcCoordByPixel(int $x, int $y): Ch1903Coordinate {
        $chCoordE = (($x - $this->pixelPos1->x) * $this->xCoordPerPixel) + $this->chCoordinate1->east;
        $chCoordN = (($y - $this->pixelPos1->y) * $this->yCoordPerPixel) + $this->chCoordinate1->north;

        return new Ch1903Coordinate($chCoordE, $chCoordN);
    }
}
