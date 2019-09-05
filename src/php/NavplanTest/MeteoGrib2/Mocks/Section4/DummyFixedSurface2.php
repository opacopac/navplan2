<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\FixedSurface;


class DummyFixedSurface2 {
    public static function create(): ?FixedSurface {
        return NULL;
    }


    public static function createData(): string {
        return pack("CCN", 255, 255, 255);
    }
}

