<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use InvalidArgumentException;
use Navplan\System\DomainModel\Color;
use Navplan\System\DomainModel\IDrawable;


class ImagickDrawable implements IDrawable {
    private Imagick $im;
    private array $colorValues;


    public function __construct(
        private int $width,
        private int $height,
        string $bgColor = null // TODO
    ) {
        $this->im = new Imagick();
        $imPx = $bgColor != null ? new ImagickPixel($bgColor) : new ImagickPixel();
        $this->im->newImage($this->width, $this->height, $imPx);
        $this->colorValues = array_fill(0, $this->width * $this->height * Color::NUM_COLOR_VALUES, 0);
        $this->countColorValues = count($this->colorValues);
    }


    public function drawPoint(int $x, int $y, array $color): void {
        if ($x < 0 || $y < 0 || $x >= $this->width || $y >= $this->height) {
            throw new InvalidArgumentException('coordinates out of bound');
        }

        $idx = ($y * $this->width + $x) * Color::NUM_COLOR_VALUES;

        $this->colorValues[$idx] = $color['r'];
        $this->colorValues[$idx + 1] = $color['g'];
        $this->colorValues[$idx + 2] = $color['b'];
    }


    public function saveImage(string $filename): void {
        $this->im->importImagePixels(
            0,
            0,
            $this->width,
            $this->height,
            "RGB",
            Imagick::PIXEL_FLOAT,
            $this->colorValues
        );

        $this->im->writeImage($filename);
    }
}
