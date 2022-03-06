<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use Navplan\System\DomainModel\IImage;


class ImagickImage implements IImage {
    private Imagick $im;


    public function __construct(string $filename) {
        $this->im = new Imagick($filename);
    }


    public function getWidth(): int {
        return $this->im->getImageWidth();
    }


    public function getHeight(): int {
        return $this->im->getImageHeight();
    }


    public function getPixelColor(float $x, float $y): ?array {
        if ($x < 0 || $y < 0 || $x >= $this->im->getImageWidth() || $y > $this->im->getImageHeight()) {
            return null;
        }

        $colTL = $this->im->getImagePixelColor((int) floor($x), (int) floor($y))->getColor();
        $colTR = $this->im->getImagePixelColor((int) ceil($x), (int) floor($y))->getColor();
        $colBL = $this->im->getImagePixelColor((int) floor($x), (int) ceil($y))->getColor();
        $colBR = $this->im->getImagePixelColor((int) ceil($x), (int) ceil($y))->getColor();
        $colT = $this->interpolateColor($colTL, ceil($x) - $x, $colTR, $x - floor($x));
        $colB = $this->interpolateColor($colBL, ceil($x) - $x, $colBR, $x - floor($x));
        $col = $this->interpolateColor($colT, ceil($y) - $y, $colB, $y - floor($y));

        return $col;
    }


    private function interpolateColor(array $color1, float $weight1, array $color2, float $weight2): array {
        $r = $color1['r'] * $weight1 + $color2['r'] * $weight2;
        $g = $color1['g'] * $weight1 + $color2['g'] * $weight2;
        $b = $color1['b'] * $weight1 + $color2['b'] * $weight2;

        return array(
            'r' => $r,
            'g' => $g,
            'b' => $b,
            'a' => 1
        );
    }
}
