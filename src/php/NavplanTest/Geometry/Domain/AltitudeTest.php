<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use PHPUnit\Framework\TestCase;


class AltitudeTest extends TestCase {
    public function test__construct() {
        $alt = new Altitude(
            5000,
            AltitudeUnit::FT,
            AltitudeReference::MSL
        );

        $this->assertNotNull($alt);
        $this->assertEquals(5000, $alt->value);
        $this->assertEquals(AltitudeUnit::FT, $alt->unit);
        $this->assertEquals(AltitudeReference::MSL, $alt->reference);
    }


    public function test_unit_fl_requires_reference_std() {
        $alt = new Altitude(
            100,
            AltitudeUnit::FL,
            AltitudeReference::STD
        );
        $this->assertNotNull($alt);
    }


    public function test_unit_fl_requires_reference_std_error1() {
        $this->expectException(InvalidArgumentException::class);
        new Altitude(
            100,
            AltitudeUnit::FL,
            AltitudeReference::MSL
        );
    }


    public function test_unit_fl_requires_reference_std_error2() {
        $this->expectException(InvalidArgumentException::class);
        new Altitude(
            100,
            AltitudeUnit::FL,
            AltitudeReference::GND
        );
    }


    public function test_reference_std_requires_unit_fl_error1() {
        $this->expectException(InvalidArgumentException::class);
        new Altitude(
            100,
            AltitudeUnit::M,
            AltitudeReference::STD
        );
    }


    public function test_reference_std_requires_unit_fl_error2() {
        $this->expectException(InvalidArgumentException::class);
        new Altitude(
            100,
            AltitudeUnit::FT,
            AltitudeReference::STD
        );
    }
}
