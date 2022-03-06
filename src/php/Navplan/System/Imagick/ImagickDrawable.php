<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickDraw;
use ImagickPixel;
use Navplan\System\DomainModel\IDrawable;


class ImagickDrawable implements IDrawable {
    private Imagick $im;
    private ImagickDraw $imDraw;


    public function __construct(
        private int $width,
        private int $height,
        string $bgColor = null
    ) {
        $this->im = new Imagick();
        $imPx = $bgColor != null ? new ImagickPixel($bgColor) : new ImagickPixel();
        $this->im->newImage($this->width, $this->height, $imPx);
        $this->imDraw = new ImagickDraw();
    }


    public function drawPoint(
        int $x,
        int $y,
        string $color = null
    ): void {
        if ($color != null) {
            $imPx = new ImagickPixel($color);
            $this->imDraw->setFillColor($imPx);
        }

        $this->imDraw->point($x, $y);
    }


    public function saveImage(string $filename): void {
        $this->im->drawImage($this->imDraw);
        $this->im->writeImage($filename);
    }
}
