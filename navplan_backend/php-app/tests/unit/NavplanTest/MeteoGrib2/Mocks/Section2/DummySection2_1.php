<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section2;

use Navplan\MeteoGrib2\Domain\Section2\LocalUseSection;


class DummySection2_1 {
    public static function create(): LocalUseSection {
        return new LocalUseSection('');
    }


    public static function createData(): string {
        return '';
    }
}
