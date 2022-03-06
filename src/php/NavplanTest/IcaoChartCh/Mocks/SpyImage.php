<?php declare(strict_types=1);

namespace NavplanTest\IcaoChartCh\Mocks;

use Navplan\System\DomainModel\IImage;


class SpyImage implements IImage {
    public function __construct(
        public int $getWidthValue,
        public int $getHeightValue,
        public ?string $getPixelColorValue
    ) {
    }

    function getPixelColor(int $x, int $y): ?string {
        return $this->getPixelColorValue;
    }

    function getWidth(): int {
        return $this->getWidthValue;
    }

    function getHeight(): int {
        return $this->getHeightValue;
    }
}
