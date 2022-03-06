<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use Navplan\System\DomainModel\IImage;


class ImagickImage implements IImage {
    private Imagick $im;


    public function __construct(string $filename) {
        $this->im = new Imagick($filename);
    }


    public function getPixelColor(int $x, int $y): ?string {
        if ($x < 0 || $y < 0 || $x >= $this->im->getImageWidth() || $y > $this->im->getImageHeight()) {
            return null;
        }

        $imgPx = $this->im->getImagePixelColor($x, $y);

        return $imgPx?->getColorAsString();
    }


    public function getWidth(): int {
        return $this->im->getImageWidth();
    }


    public function getHeight(): int {
        return $this->im->getImageHeight();
    }
}
