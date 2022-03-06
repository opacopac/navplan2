<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;
use Navplan\System\DomainService\IImageService;


class ImagickService implements IImageService {
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
}
