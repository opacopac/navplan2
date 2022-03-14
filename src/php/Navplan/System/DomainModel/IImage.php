<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


use Navplan\Common\DomainModel\Vector2d;

interface IImage {
    function getWidth(): int;

    function getHeight(): int;

    function getPixelColor(Vector2d $xy): ?array;

    function saveImage(string $filename): void;
}
