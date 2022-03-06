<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


interface IImage {
    function getPixelColor(int $x, int $y): string;

    function getWidth(): int;

    function getHeight(): int;
}
