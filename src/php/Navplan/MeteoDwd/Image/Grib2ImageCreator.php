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
            $im = RectangularPngCreator::create($numColumns, $numRows, 0, 100, $values);

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
