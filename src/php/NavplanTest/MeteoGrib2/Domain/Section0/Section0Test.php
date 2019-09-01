<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section0;

use Navplan\MeteoGrib2\Domain\Section0\Discipline;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummySection0_1;
use PHPUnit\Framework\TestCase;


class Section0Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection0_1::create();

        $this->assertEquals(new Discipline(Discipline::METEOROLOGICAL_PRODUCTS), $section->getDiscipline());
        $this->assertEquals(2, $section->getGribEdition());
    }
}
