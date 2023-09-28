<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use PHPUnit\Framework\TestCase;


class TemperatureTest extends TestCase {
    public function test__construct() {
        $temp = new Temperature(24.5, TemperatureUnit::C);

        $this->assertNotNull($temp);
    }


    public function test_getValueFromC() {
        $temp = new Temperature(0, TemperatureUnit::C);

        $this->assertEquals(0, $temp->getValue(TemperatureUnit::C));
        $this->assertEquals(273.15, $temp->getValue(TemperatureUnit::K));
        $this->assertEquals(32, $temp->getValue(TemperatureUnit::F));
    }


    public function test_getValueFromK() {
        $temp = new Temperature(0, TemperatureUnit::K);

        $this->assertEquals(-273.150, $temp->getValue(TemperatureUnit::C));
        $this->assertEquals(0, $temp->getValue(TemperatureUnit::K));
        $this->assertEquals(-459.67, $temp->getValue(TemperatureUnit::F));
    }


    public function test_getValueFromF() {
        $temp = new Temperature(0, TemperatureUnit::F);

        $this->assertEqualsWithDelta(-17.7778, $temp->getValue(TemperatureUnit::C), 0.0001);
        $this->assertEqualsWithDelta(255.372, $temp->getValue(TemperatureUnit::K), 0.001);
        $this->assertEquals(0, $temp->getValue(TemperatureUnit::F));
    }
}
