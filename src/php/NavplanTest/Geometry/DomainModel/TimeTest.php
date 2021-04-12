<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use Navplan\Geometry\DomainModel\Time;
use Navplan\Geometry\DomainModel\TimeUnit;
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


    public function test_convert_ms_s() {
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


    public function test_convert_min_s() {
        $min = 1.5;
        $s = 90;

        $mins_min_Result = Time::convert($min, TimeUnit::MIN, TimeUnit::MIN);
        $min_s_Result = Time::convert($min, TimeUnit::MIN, TimeUnit::S);
        $s_min_Result = Time::convert($s, TimeUnit::S, TimeUnit::MIN);
        $s_s_Result = Time::convert($s, TimeUnit::S, TimeUnit::S);

        $this->assertEquals($min, $mins_min_Result);
        $this->assertEquals($s, $min_s_Result);
        $this->assertEquals($min, $s_min_Result);
        $this->assertEquals($s, $s_s_Result);
    }


    public function test_convert_min_ms() {
        $min = 1.5;
        $ms = 90000;

        $mins_min_Result = Time::convert($min, TimeUnit::MIN, TimeUnit::MIN);
        $min_ms_Result = Time::convert($min, TimeUnit::MIN, TimeUnit::MS);
        $ms_min_Result = Time::convert($ms, TimeUnit::MS, TimeUnit::MIN);
        $ms_ms_Result = Time::convert($ms, TimeUnit::MS, TimeUnit::MS);

        $this->assertEquals($min, $mins_min_Result);
        $this->assertEquals($ms, $min_ms_Result);
        $this->assertEquals($min, $ms_min_Result);
        $this->assertEquals($ms, $ms_ms_Result);
    }
}
