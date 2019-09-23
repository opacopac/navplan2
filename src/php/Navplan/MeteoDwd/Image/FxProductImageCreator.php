<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Image;

use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormat;


class FxProductImageCreator {
    public static function createImage(string $imgFilename, RunLengthFormat $runLengthFormat) {
        if (!$imgFilename)
            return;

        $numRowsCols = $runLengthFormat->getHeader()->getPixelRowsCols();
        $im = RectangularPngCreator::create(
            $numRowsCols[1],
            $numRowsCols[0],
            $runLengthFormat->getValues()->getMinValue(),
            $runLengthFormat->getValues()->getMaxValue(),
            $runLengthFormat->getValues()->getValueList()
        );
        $im->flipImage();

        $im->writeImage("png8:" . $imgFilename);
    }
}
