<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Navplan\Common\Domain\Model\Angle;
use Navplan\System\Domain\Model\IDrawable;
use Navplan\System\Domain\Model\IImage;
use Navplan\System\Domain\Service\IImageService;


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
