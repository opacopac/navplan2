<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\Vector2d;
use Navplan\System\DomainModel\IImage;


class ImagickImage implements IImage {
    private function __construct(private Imagick $im) {
    }


    public static function loadImg(string $filename) {
        $im = new Imagick($filename);

        return new ImagickImage($im);
    }


    public static function loadPdf(
        string $filename,
        float $resolutionDpi,
        int $page,
        Angle $rotation
    ): IImage {
        $im = new Imagick();
        $im->setResolution($resolutionDpi, $resolutionDpi);
        $im->setColorspace(Imagick::COLORSPACE_RGB);
        $im->readImage($filename . "[" . $page . "]");
        $im->setImageBackgroundColor(new ImagickPixel('white'));
        $im = $im->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);
        $im->trimImage(0);
        $im->setBackgroundColor(new ImagickPixel('transparent'));

        if ($rotation->toDeg() != 0) {
            $im->rotateImage(new ImagickPixel('transparent'), $rotation->toDeg());
        }

        return new ImagickImage($im);
    }


    public function getWidth(): int {
        return $this->im->getImageWidth();
    }


    public function getHeight(): int {
        return $this->im->getImageHeight();
    }


    public function getPixelColor(Vector2d $xy): ?array {
        if ($xy->x < 0 || $xy->y < 0 || $xy->x >= $this->im->getImageWidth() || $xy->y > $this->im->getImageHeight()) {
            return null;
        }
        $floorX = (int) floor($xy->x);
        $floorY = (int) floor($xy->y);
        $ceilX = (int) ceil($xy->x);
        $ceilY = (int) ceil($xy->y);

        if ($floorX === $ceilX || $floorY == $ceilY) {
            return $this->im->getImagePixelColor($floorX, $floorY)->getColor();
        }

        $colTL = $this->im->getImagePixelColor($floorX, $floorY)->getColor();
        $colTR = $this->im->getImagePixelColor($ceilX, $floorY)->getColor();
        $colBL = $this->im->getImagePixelColor($floorX, $ceilY)->getColor();
        $colBR = $this->im->getImagePixelColor($ceilX, $ceilY)->getColor();
        $colT = $this->interpolateColor($colTL, $ceilX - $xy->x, $colTR, $xy->x - $floorX);
        $colB = $this->interpolateColor($colBL, $ceilX - $xy->x, $colBR, $xy->x - $floorX);
        $col = $this->interpolateColor($colT, $ceilY - $xy->y, $colB, $xy->y - $floorY);

        return $col;
    }


    public function saveImage(string $filename): void {
        $this->im->writeImage($filename);
    }


    private function interpolateColor(array $color1, float $weight1, array $color2, float $weight2): array {
        $r = $color1['r'] * $weight1 + $color2['r'] * $weight2;
        $g = $color1['g'] * $weight1 + $color2['g'] * $weight2;
        $b = $color1['b'] * $weight1 + $color2['b'] * $weight2;
        $a = $color1['a'] * $weight1 + $color2['a'] * $weight2;

        return array(
            'r' => $r,
            'g' => $g,
            'b' => $b,
            'a' => $a
        );
    }
}
