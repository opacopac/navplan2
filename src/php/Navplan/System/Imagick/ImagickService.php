<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;
use Navplan\System\DomainService\IImageService;


class ImagickService implements IImageService {
    public function createDrawable(
        int $width,
        int $height,
    ): IDrawable {
        return new ImagickDrawable($width, $height);
    }


    public function loadImage(string $filename): IImage {
        return ImagickImage::loadImg($filename);
    }


    public function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): IImage {
        return ImagickImage::loadPdf($abs_filename, $resolutionDpi, $page, $rotation);
    }
}
