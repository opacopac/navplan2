<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\AltitudeUnit;
use PHPUnit\Framework\TestCase;


class AltitudeUnitTest extends TestCase {
    public function test_fromString() {
        $unit = AltitudeUnit::fromString('M');
        $this->assertEquals(AltitudeUnit::M, $unit);

        $unit = AltitudeUnit::fromString('FT');
        $this->assertEquals(AltitudeUnit::FT, $unit);

        $unit = AltitudeUnit::fromString('F');
        $this->assertEquals(AltitudeUnit::FT, $unit);

        $unit = AltitudeUnit::fromString('FL');
        $this->assertEquals(AltitudeUnit::FL, $unit);
    }


    public function test_fromString_case_trim() {
        $unit = AltitudeUnit::fromString(' m ');
        $this->assertEquals(AltitudeUnit::M, $unit);

        $unit = AltitudeUnit::fromString('Ft ');
        $this->assertEquals(AltitudeUnit::FT, $unit);

        $unit = AltitudeUnit::fromString(' f');
        $this->assertEquals(AltitudeUnit::FT, $unit);

        $unit = AltitudeUnit::fromString(' fL ');
        $this->assertEquals(AltitudeUnit::FL, $unit);
    }


    public function test_fromString_invalid_unit() {
        $this->expectException(InvalidArgumentException::class);
        AltitudeUnit::fromString('XXX');
    }


    public function test_toString() {
        $unitStr = AltitudeUnit::toString(AltitudeUnit::M);
        $this->assertEquals("M", $unitStr);

        $unitStr = AltitudeUnit::toString(AltitudeUnit::FT);
        $this->assertEquals("FT", $unitStr);

        $unitStr = AltitudeUnit::toString(AltitudeUnit::FL);
        $this->assertEquals("FL", $unitStr);

    }


    public function test_toString_invalid_unit() {
        $this->expectException(InvalidArgumentException::class);
        AltitudeUnit::toString(99999);
    }
}
