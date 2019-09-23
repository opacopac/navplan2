<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section2;

use Navplan\MeteoGrib2\Domain\Section2\Section2;


class DummySection2_1 {
    public static function create(): Section2 {
        return new Section2('');
    }


    public static function createData(): string {
        return '';
    }
}
