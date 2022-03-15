<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\Color;
use Navplan\System\DomainModel\IImage;


class ImagickImage implements IImage {
    private array $pixelValues;
    private int $pixelValueCount;


    private function __construct(private Imagick $im) {
        $this->pixelValues = $im->exportImagePixels(0, 0, $im->getImageWidth(), $im->getImageHeight(), "RGB", Imagick::PIXEL_FLOAT);
        $this->pixelValueCount = count($this->pixelValues);
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


    public function interpolatePixelColor(float $x, float $y): ?array {
        if ($x < 0 || $y < 0 || $x >= $this->im->getImageWidth() || $y >= $this->im->getImageHeight()) {
            return null;
        }
        $floorX = (int) floor($x);
        $floorY = (int) floor($y);
        $ceilX = (int) ceil($x);
        $ceilY = (int) ceil($y);

        if ($floorX === $ceilX || $floorY == $ceilY) {
            return $this->getPixelColor($floorX, $floorY);
        }

        $col2TL = $this->getPixelColor($floorX, $floorY);
        $col2TR = $this->getPixelColor($ceilX, $floorY);
        $col2BL = $this->getPixelColor($floorX, $ceilY);
        $col2BR = $this->getPixelColor($ceilX, $ceilY);
        $col2T = $this->interpolateColor($col2TL, $ceilX - $x, $col2TR, $x - $floorX);
        $col2B = $this->interpolateColor($col2BL, $ceilX - $x, $col2BR, $x - $floorX);
        $col2 = $this->interpolateColor($col2T, $ceilY - $y, $col2B, $y - $floorY);

        return $col2;
    }


    public function saveImage(string $filename): void {
        $this->im->writeImage($filename);
    }


    private function getPixelColor(int $x, int $y): array {
        $idx = ($y * $this->getWidth() + $x) * 3;
        if ($idx < $this->pixelValueCount) {
            return array(
                'r' => $this->pixelValues[$idx],
                'g' => $this->pixelValues[$idx + 1],
                'b' => $this->pixelValues[$idx + 2],
            );
        } else {
            return Color::BLACK; // TODO
        }
    }


    private function interpolateColor(array $color1, float $weight1, array $color2, float $weight2): array {
        return array(
            'r' => $color1['r'] * $weight1 + $color2['r'] * $weight2,
            'g' => $color1['g'] * $weight1 + $color2['g'] * $weight2,
            'b' => $color1['b'] * $weight1 + $color2['b'] * $weight2,
        );
    }
}
