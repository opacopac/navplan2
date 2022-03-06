<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


interface IImage {
    function getWidth(): int;

    function getHeight(): int;

    function getPixelColor(float $x, float $y): ?array;
}
