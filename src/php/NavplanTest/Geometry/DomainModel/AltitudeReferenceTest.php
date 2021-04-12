<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use InvalidArgumentException;
use Navplan\Geometry\DomainModel\AltitudeReference;
use PHPUnit\Framework\TestCase;


class AltitudeReferenceTest extends TestCase {
    public function test_fromString() {
        $unit = AltitudeReference::fromString('GND');
        $this->assertEquals(AltitudeReference::GND, $unit);

        $unit = AltitudeReference::fromString('MSL');
        $this->assertEquals(AltitudeReference::MSL, $unit);

        $unit = AltitudeReference::fromString('STD');
        $this->assertEquals(AltitudeReference::STD, $unit);
    }


    public function test_fromString_case_trim() {
        $unit = AltitudeReference::fromString(' GnD ');
        $this->assertEquals(AltitudeReference::GND, $unit);

        $unit = AltitudeReference::fromString('msl ');
        $this->assertEquals(AltitudeReference::MSL, $unit);

        $unit = AltitudeReference::fromString(' sTd');
        $this->assertEquals(AltitudeReference::STD, $unit);
    }


    public function test_fromString_invalid_unit() {
        $this->expectException(InvalidArgumentException::class);
        AltitudeReference::fromString('XXX');
    }


    public function test_toString() {
        $unitStr = AltitudeReference::toString(AltitudeReference::GND);
        $this->assertEquals("GND", $unitStr);

        $unitStr = AltitudeReference::toString(AltitudeReference::MSL);
        $this->assertEquals("MSL", $unitStr);

        $unitStr = AltitudeReference::toString(AltitudeReference::STD);
        $this->assertEquals("STD", $unitStr);

    }


    public function test_toString_invalid_unit() {
        $this->expectException(InvalidArgumentException::class);
        AltitudeReference::toString(99999);
    }
}
