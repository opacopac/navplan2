<?php declare(strict_types=1);

namespace NavplanTest\IcaoChartCh\Mocks;

use Navplan\System\DomainModel\IImage;


class SpyImage implements IImage {
    public function __construct(
        public int $getWidthValue,
        public int $getHeightValue,
        public ?array $getPixelColorValue = null
    ) {
    }


    function getPixelColor(float $x, float $y): ?array {
        return $this->getPixelColorValue;
    }


    function getWidth(): int {
        return $this->getWidthValue;
    }


    function getHeight(): int {
        return $this->getHeightValue;
    }
}
