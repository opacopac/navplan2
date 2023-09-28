<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


interface IImage {
    function getWidth(): int;

    function getHeight(): int;

    function interpolatePixelColor(float $x, float $y): ?array;

    function saveImage(string $filename): void;
}
