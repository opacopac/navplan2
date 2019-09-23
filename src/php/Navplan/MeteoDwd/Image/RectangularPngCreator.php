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
        $im->newImage($numColumns, $numRows, new ImagickPixel('transparent'));
        $im->setImageFormat("png");

        return $im;
    }


    private static function drawPixels(Imagick $im, float $minValue, float $maxValue, array $values): void {
        $imIterator = $im->getPixelIterator();

        $i = 0;
        while ($pixelRow = $imIterator->getNextIteratorRow()) {
            foreach ($pixelRow as $colNum => $pixel) {
                $color = self::getPixelValue($values[$i], $minValue, $maxValue);
                $pixel->setColor("rgba(" . $color . "," . $color . "," . $color . ", 1.0)");
                // $alpha = round($values[$i] / 100.0, 1);
                //$pixel->setColor("rgba(255, 0, 0, " . $alpha . ")");
                $i++;
            }

            $imIterator->syncIterator();
        }
    }


    private static function getPixelValue(float $value, float $minValue, float $maxValue): int {
        return intval(($value - $minValue) / ($maxValue - $minValue) * 255);
    }
}
