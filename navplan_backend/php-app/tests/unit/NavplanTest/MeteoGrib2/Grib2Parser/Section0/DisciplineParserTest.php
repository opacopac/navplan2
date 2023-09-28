<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section0;

use Navplan\MeteoGrib2\Domain\Section0\Discipline;
use Navplan\MeteoGrib2\Grib2Parser\Section0\DisciplineParser;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummyDiscipline1;
use PHPUnit\Framework\TestCase;


class DisciplineParserTest extends TestCase {
    public function test_parse() {
        $value = DummyDiscipline1::createValue();
        $expected = DummyDiscipline1::create();

        $discipline = DisciplineParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }


    public function test_parse_meteorological_products() {
        $value = 0;
        $expected = new Discipline(Discipline::METEOROLOGICAL_PRODUCTS);

        $discipline = DisciplineParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }
}
