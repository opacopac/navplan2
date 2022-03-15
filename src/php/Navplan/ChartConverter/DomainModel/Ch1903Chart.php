<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainModel;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainModel\IImage;


class Ch1903Chart {
    private float $xCoordPerPixel; // E
    private float $yCoordPerPixel; // N
    private float $rotationRad;


    private function __construct(
        public IImage            $image,
        private XyPair           $pixelPos1,
        private Ch1903Coordinate $chCoordinate1
    ) {
    }


    public static function fromPos1AndPos2(
        IImage           $image,
        XyPair           $pixelPos1,
        Ch1903Coordinate $chCoordinate1,
        XyPair           $pixelPos2,
        Ch1903Coordinate $chCoordinate2
    ): Ch1903Chart {
        $pxDiffX = $pixelPos2->x - $pixelPos1->x;
        $pxDiffY = $pixelPos2->y - $pixelPos1->y;
        $coordDiffE = $chCoordinate2->east - $chCoordinate1->east;
        $coordDiffN = $chCoordinate2->north - $chCoordinate1->north;

        $chart = new Ch1903Chart($image, $pixelPos1, $chCoordinate1);
        $chart->xCoordPerPixel = $coordDiffE / $pxDiffX;
        $chart->yCoordPerPixel = $coordDiffN / $pxDiffY;
        $chart->rotationRad = 0;

        return $chart;
    }


    public static function fromPosAndScale(
        IImage           $image,
        XyPair           $pixelPos1,
        Ch1903Coordinate $chCoordinate1,
        int              $chartScale,
        float            $resolutionDpi
    ): Ch1903Chart {
        $width_mm = $image->getWidth() / $resolutionDpi * Length::MM_PER_INCH;
        $height_mm = $image->getHeight() / $resolutionDpi * Length::MM_PER_INCH;

        $chart = new Ch1903Chart($image, $pixelPos1, $chCoordinate1);
        $chart->xCoordPerPixel = $width_mm / $image->getWidth() / 1000 * $chartScale;
        $chart->yCoordPerPixel = -$height_mm / $image->getHeight() / 1000 * $chartScale;
        $chart->rotationRad = 0;

        return $chart;
    }


    public static function fromPos1Pos2Rot(
        IImage           $image,
        XyPair           $pixelPos1,
        Ch1903Coordinate $chCoordinate1,
        XyPair           $pixelPos2,
        Ch1903Coordinate $chCoordinate2
    ): Ch1903Chart {
        $pxDiffX = $pixelPos2->x - $pixelPos1->x;
        $pxDiffY = $pixelPos2->y - $pixelPos1->y;
        $pxDiff = sqrt(pow($pxDiffX, 2) + pow($pxDiffY, 2));
        $pxRotRad = atan2($pxDiffY, $pxDiffX);

        $coordDiffE = $chCoordinate2->east - $chCoordinate1->east;
        $coordDiffN = $chCoordinate2->north - $chCoordinate1->north;
        $coordDiff = sqrt(pow($coordDiffE, 2) + pow($coordDiffN, 2));
        $coordRotRad = -atan2($coordDiffN, $coordDiffE);

        $coordPerPixel = $coordDiff / $pxDiff;
        $rotRad = $pxRotRad - $coordRotRad;

        $chart = new Ch1903Chart($image, $pixelPos1, $chCoordinate1);
        $chart->xCoordPerPixel = $coordPerPixel;
        $chart->yCoordPerPixel = -$coordPerPixel;
        $chart->rotationRad = $rotRad;

        return $chart;
    }


    public function getPixelColor(Ch1903Coordinate $chCoord): ?array {
        $pxRelX = ($chCoord->east - $this->chCoordinate1->east) / $this->xCoordPerPixel;
        $pxRelY = ($chCoord->north - $this->chCoordinate1->north) / $this->yCoordPerPixel;

        if ($this->rotationRad != 0) {
            $pxRelX2 = $pxRelX * cos($this->rotationRad) - $pxRelY * sin($this->rotationRad);
            $pxRelY = $pxRelX * sin($this->rotationRad) + $pxRelY * cos($this->rotationRad);
            $pxRelX = $pxRelX2;
        }

        $pxRelX += $this->pixelPos1->x;
        $pxRelY += $this->pixelPos1->y;

        return $this->image->interpolatePixelColor($pxRelX, $pxRelY);
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
        $pxRelX = $x - $this->pixelPos1->x;
        $pxRelY = $y - $this->pixelPos1->y;

        if ($this->rotationRad != 0) {
            $pxRelX2 = $pxRelX * cos($this->rotationRad) - $pxRelY * sin($this->rotationRad);
            $pxRelY = $pxRelX * sin($this->rotationRad) + $pxRelY * cos($this->rotationRad);
            $pxRelX = $pxRelX2;
        }

        $chCoordE = $pxRelX * $this->xCoordPerPixel + $this->chCoordinate1->east;
        $chCoordN = $pxRelY * $this->yCoordPerPixel + $this->chCoordinate1->north;

        return new Ch1903Coordinate($chCoordE, $chCoordN);
    }
}
