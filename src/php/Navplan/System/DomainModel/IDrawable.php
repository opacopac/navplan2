<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


interface IDrawable {
    public function drawPoint(int $x, int $y, array $color): void;

    function saveImage(string $filename): void;
}
