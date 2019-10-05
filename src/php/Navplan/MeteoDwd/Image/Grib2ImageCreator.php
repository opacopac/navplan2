<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Image;

use http\Exception\InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplate0;
use Navplan\MeteoGrib2\Domain\Section3\IGridDefinitionTemplate;


class Grib2ImageCreator {
    public static function createImage(string $imgFilename, IGridDefinitionTemplate $gridDefinitionTemplate, array $values) {
        if (!$imgFilename)
            return;

        if ($gridDefinitionTemplate instanceof GridDefinitionTemplate0) {
            $numColumns = $gridDefinitionTemplate->getNumPointsParallel();
            $numRows = $gridDefinitionTemplate->getNumPointsMeridian();
            // TODO
            $minValue = 0;
            // $maxValue = 100;
            $maxValue = array_reduce(
                $values,
                function ($max, $value) { return max($max, $value); },
                0
            );
            $im = RectangularPngCreator::create($numColumns, $numRows, $minValue, $maxValue, $values);

            $scanningMode = $gridDefinitionTemplate->getScanningMode();

            if (!$scanningMode->isJScanDirectionNtoS())
                $im->flipImage();

            if (!$scanningMode->isIScanDirectionWtoE())
                $im->flopImage();

        } else {
            throw new InvalidArgumentException('unknown template type');
        }

        $im->writeImage("png8:" . $imgFilename);
    }
}
