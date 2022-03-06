<?php declare(strict_types=1);

namespace Navplan\System\DomainService;

use Navplan\System\DomainModel\IDrawable;
use Navplan\System\DomainModel\IImage;


interface IImageService {
    function createDrawable(int $width, int $height, string $bgColor = null): IDrawable;

    function loadImage(string $filename): IImage;
}
