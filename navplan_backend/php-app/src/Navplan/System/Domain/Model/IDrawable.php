<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


interface IDrawable {
    public function drawPoint(int $x, int $y, array $color): void;

    function saveImage(string $filename): void;
}
