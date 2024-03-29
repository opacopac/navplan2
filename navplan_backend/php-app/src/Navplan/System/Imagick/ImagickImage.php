<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use Navplan\Common\Domain\Model\Angle;
use Navplan\System\Domain\Model\Color;
use Navplan\System\Domain\Model\IImage;


class ImagickImage implements IImage {
    private array $pixelValues;
    private int $width;
    private int $height;


    private function __construct(private Imagick $im) {
        $this->width = $im->getImageWidth();
        $this->height = $im->getImageHeight();
        $this->pixelValues = $im->exportImagePixels(
            0,
            0,
            $this->width,
            $this->height,
            "RGBA",
            Imagick::PIXEL_FLOAT
        );
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
        return $this->width;
    }


    public function getHeight(): int {
        return $this->height;
    }


    public function interpolatePixelColor(float $x, float $y): array {
        $floorX = (int) floor($x);
        $floorY = (int) floor($y);
        $ceilX = (int) ceil($x);
        $ceilY = (int) ceil($y);

        if ($ceilX < 0 || $ceilY < 0 || $floorX >= $this->width || $floorY >= $this->height) {
            return Color::TRANSPARENT;
        }

        if ($floorX === $ceilX || $floorY == $ceilY) {
            return $this->getPixelColor($floorX, $floorY);
        }

        $colTL = $this->getPixelColor($floorX, $floorY);
        $colTR = $this->getPixelColor($ceilX, $floorY);
        $colBL = $this->getPixelColor($floorX, $ceilY);
        $colBR = $this->getPixelColor($ceilX, $ceilY);
        $colT = $this->interpolateColor($colTL, $ceilX - $x, $colTR, $x - $floorX);
        $colB = $this->interpolateColor($colBL, $ceilX - $x, $colBR, $x - $floorX);
        $col = $this->interpolateColor($colT, $ceilY - $y, $colB, $y - $floorY);

        return $col;
    }


    public function saveImage(string $filename): void {
        $this->im->writeImage($filename);
    }


    private function getPixelColor(int $x, int $y): array {
        if ($x < 0 || $y < 0 || $x >= $this->width || $y >= $this->height) {
            return Color::TRANSPARENT;
        }

        $idx = ($y * $this->width + $x) * Color::NUM_COLOR_VALUES;

        return array(
            Color::R => $this->pixelValues[$idx],
            Color::G => $this->pixelValues[$idx + 1],
            Color::B => $this->pixelValues[$idx + 2],
            Color::A => $this->pixelValues[$idx + 3]
        );
    }


    private function interpolateColor(array $color1, float $weight1, array $color2, float $weight2): array {
        return array(
            Color::R => $color1[Color::R] * $weight1 + $color2[Color::R] * $weight2,
            Color::G => $color1[Color::G] * $weight1 + $color2[Color::G] * $weight2,
            Color::B => $color1[Color::B] * $weight1 + $color2[Color::B] * $weight2,
            Color::A => $color1[Color::A] * $weight1 + $color2[Color::A] * $weight2,
        );
    }
}
