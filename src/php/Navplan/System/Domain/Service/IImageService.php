<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;

use Navplan\Common\Domain\Model\Angle;
use Navplan\System\Domain\Model\IDrawable;
use Navplan\System\Domain\Model\IImage;


interface IImageService {
    function createDrawable(int $width, int $height): IDrawable;

    function loadImage(string $filename): IImage;

    function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): IImage;
}
