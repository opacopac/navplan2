<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


interface IImage {
    function getWidth(): int;

    function getHeight(): int;

    function interpolatePixelColor(float $x, float $y): ?array;

    function saveImage(string $filename): void;
}
