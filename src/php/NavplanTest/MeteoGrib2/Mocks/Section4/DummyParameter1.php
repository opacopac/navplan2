<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\Parameter;


class DummyParameter1 {
    public static function create(): Parameter {
        return new Parameter(3, 5) ;
    }


    public static function createData(): string {
        return pack("CC", 3, 5);
    }
}

