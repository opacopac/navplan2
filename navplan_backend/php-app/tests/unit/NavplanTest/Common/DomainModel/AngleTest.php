<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\AngleUnit;
use PHPUnit\Framework\TestCase;


class AngleTest extends TestCase {
    public function test_create_deg() {
        $deg = 90;

        $angle = new Angle($deg, AngleUnit::DEG);

        $this->assertNotNull($angle);
        $this->assertEquals($deg, $angle->getValue(AngleUnit::DEG));
        $this->assertEquals(pi() / 2, $angle->getValue(AngleUnit::RAD));
    }


    public function test_create_rad() {
        $rad = pi();

        $angle = new Angle($rad, AngleUnit::RAD);

        $this->assertNotNull($angle);
        $this->assertEquals($rad, $angle->getValue(AngleUnit::RAD));
        $this->assertEquals(180, $angle->getValue(AngleUnit::DEG));
    }


    public function test_convert() {
        $deg = 270;
        $rad = 3 * pi() / 2;

        $deg_deg_Result = Angle::convert($deg, AngleUnit::DEG, AngleUnit::DEG);
        $deg_rad_Result = Angle::convert($deg, AngleUnit::DEG, AngleUnit::RAD);
        $rad_deg_Result = Angle::convert($rad, AngleUnit::RAD, AngleUnit::DEG);
        $rad_rad_Result = Angle::convert($rad, AngleUnit::RAD, AngleUnit::RAD);

        $this->assertEquals($deg, $deg_deg_Result);
        $this->assertEquals($rad, $deg_rad_Result);
        $this->assertEquals($deg, $rad_deg_Result);
        $this->assertEquals($rad, $rad_rad_Result);
    }
}
