<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use PHPUnit\Framework\TestCase;


class LengthTest extends TestCase {
    public function test__construct() {
        $len = new Length(1.234, LengthUnit::M);

        $this->assertNotNull($len);
    }


    public function test_getValue() {
        $len = new Length(1, LengthUnit::M);

        $this->assertEquals(Length::FT_PER_M, $len->getValue(LengthUnit::FT));
        $this->assertEquals(1 / Length::M_PER_NM, $len->getValue(LengthUnit::NM));
        $this->assertEquals(1, $len->getValue(LengthUnit::M));
    }


    public function test_convert() {
        $ft_per_m = Length::convert(1, LengthUnit::M, LengthUnit::FT);
        $m_per_nm = Length::convert(1, LengthUnit::NM, LengthUnit::M);
        $ft_per_nm = Length::convert(1, LengthUnit::NM, LengthUnit::FT);

        $this->assertEquals(Length::FT_PER_M, $ft_per_m);
        $this->assertEquals(Length::M_PER_NM, $m_per_nm);
        $this->assertEquals(Length::FT_PER_NM, $ft_per_nm);
    }


    public function test_convert_invalid_unit1() {
        $this->expectException(InvalidArgumentException::class);
        Length::convert(1, LengthUnit::M, 999);
    }


    public function test_convert_invalid_unit2() {
        $this->expectException(InvalidArgumentException::class);
        Length::convert(1, 999, LengthUnit::M);
    }
}
