<?php declare(strict_types=1);

namespace Navplan\System\DomainService;

use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;


interface IImageService {
    function createDrawable(int $width, int $height): IDrawable;

    function loadImage(string $filename): IImage;

    function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): IImage;
}
