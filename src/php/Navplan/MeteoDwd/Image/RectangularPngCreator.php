<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Image;

use Imagick;
use ImagickPixel;
use InvalidArgumentException;


class RectangularPngCreator {
    public static function create(int $numColumns, int $numRows, float $minValue, float $maxValue, array $values): Imagick {
        if (count($values) < $numRows * $numColumns) {
            throw new InvalidArgumentException('not enough values: ' . $numRows * $numColumns . ' required, ' . count($values) . ' available');
        }

        $im = self::createImage($numColumns, $numRows);
        self::drawPixels($im, $minValue, $maxValue, $values);

        return $im;
    }


    private static function createImage(int $numColumns, int $numRows): Imagick {
        $im = new Imagick();
        $im->newImage($numColumns, $numRows, new ImagickPixel('black'));
        $im->setImageFormat("png");

        return $im;
    }


    private static function drawPixels(Imagick $im, float $minValue, float $maxValue, array $values): void {
        $pixelValues = array_map(
            function ($value) use ($minValue, $maxValue) {
                return ($value - $minValue) / ($maxValue - $minValue) * 255;
            },
            $values
        );

        $im->importImagePixels(0, 0, $im->getImageWidth(), $im->getImageHeight(), "I", Imagick::PIXEL_CHAR, $pixelValues);
    }
}
