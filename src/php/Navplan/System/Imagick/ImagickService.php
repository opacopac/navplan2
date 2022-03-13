<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;
use Navplan\System\DomainModel\IPdf;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\IPdfService;


class ImagickService implements IImageService, IPdfService {
    public function createDrawable(
        int $width,
        int $height,
        string $bgColor = null
    ): IDrawable {
        return new ImagickDrawable($width, $height, $bgColor);
    }


    public function loadImage(string $filename): IImage {
        return new ImagickImage($filename);
    }


    public function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): IPdf {
        return new ImagickPdf($abs_filename, $resolutionDpi, $page, $rotation);
    }
}
