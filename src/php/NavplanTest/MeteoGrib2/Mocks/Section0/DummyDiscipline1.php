<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section0;

use Navplan\MeteoGrib2\Domain\Section0\Discipline;


class DummyDiscipline1 {
    public static function create(): Discipline {
        return new Discipline(Discipline::OCEANOGRAPHIC_PRODUCTS);
    }


    public static function createValue(): int {
        return 10;
    }
}
