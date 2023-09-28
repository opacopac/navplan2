<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use InvalidArgumentException;
use Navplan\System\Domain\Model\Color;
use Navplan\System\Domain\Model\IDrawable;


class ImagickDrawable implements IDrawable {
    private Imagick $im;
    private array $colorValues;


    public function __construct(
        private int $width,
        private int $height,
    ) {
        $this->im = new Imagick();
        $imPx = new ImagickPixel('transparent');
        $this->im->newImage($this->width, $this->height, $imPx);
        $this->colorValues = array_fill(0, $this->width * $this->height * Color::NUM_COLOR_VALUES, 0);
        $this->countColorValues = count($this->colorValues);
    }


    public function drawPoint(int $x, int $y, array $color): void {
        if ($x < 0 || $y < 0 || $x >= $this->width || $y >= $this->height) {
            throw new InvalidArgumentException('coordinates out of bound');
        }

        $idx = ($y * $this->width + $x) * Color::NUM_COLOR_VALUES;

        $this->colorValues[$idx] = $color[Color::R];
        $this->colorValues[$idx + 1] = $color[Color::G];
        $this->colorValues[$idx + 2] = $color[Color::B];
        $this->colorValues[$idx + 3] = $color[Color::A];
    }


    public function saveImage(string $filename): void {
        $this->im->importImagePixels(
            0,
            0,
            $this->width,
            $this->height,
            "RGBA",
            Imagick::PIXEL_FLOAT,
            $this->colorValues
        );

        $this->im->writeImage($filename);
    }
}
