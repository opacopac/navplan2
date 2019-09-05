<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section0;

use NavplanTest\MeteoGrib2\Mocks\Section0\DummyDiscipline1;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummySection0_1;
use PHPUnit\Framework\TestCase;


class Section0Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection0_1::create();

        $this->assertEquals(DummyDiscipline1::create(), $section->getDiscipline());
        $this->assertEquals(2, $section->getGribEdition());
    }
}
