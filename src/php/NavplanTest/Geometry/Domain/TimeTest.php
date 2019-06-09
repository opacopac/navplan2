<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\TimeUnit;
use PHPUnit\Framework\TestCase;


class TimeTest extends TestCase {
    public function test_create_ms() {
        $ms = 14500.0;

        $time = new Time($ms, TimeUnit::MS);

        $this->assertNotNull($time);
        $this->assertEquals($ms, $time->getValue(TimeUnit::MS));
        $this->assertEquals($ms / 1000, $time->getValue(TimeUnit::S));
    }


    public function test_create_s() {
        $s = 120.3;

        $time = new Time($s, TimeUnit::S);

        $this->assertNotNull($time);
        $this->assertEquals($s, $time->getValue(TimeUnit::S));
        $this->assertEquals($s * 1000, $time->getValue(TimeUnit::MS));
    }


    public function test_convert() {
        $ms = 12345;
        $s = 12.345;

        $ms_ms_Result = Time::convert($ms, TimeUnit::MS, TimeUnit::MS);
        $ms_s_Result = Time::convert($ms, TimeUnit::MS, TimeUnit::S);
        $s_ms_Result = Time::convert($s, TimeUnit::S, TimeUnit::MS);
        $s_s_Result = Time::convert($s, TimeUnit::S, TimeUnit::S);

        $this->assertEquals($ms, $ms_ms_Result);
        $this->assertEquals($s, $ms_s_Result);
        $this->assertEquals($ms, $s_ms_Result);
        $this->assertEquals($s, $s_s_Result);
    }
}
