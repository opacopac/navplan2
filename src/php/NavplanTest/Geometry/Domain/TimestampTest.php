<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use Navplan\Geometry\Domain\Timestamp;
use PHPUnit\Framework\TestCase;


class TimestampTest extends TestCase {
    public function test_fromMs() {
        $ms = 1560000429704;

        $timestamp = Timestamp::fromMs($ms);

        $this->assertNotNull($timestamp);
        $this->assertEquals($ms, $timestamp->toMs());
        $this->assertEquals(ceil($ms / 1000), $timestamp->toS());
    }


    public function test_fromS() {
        $s = 1560004939;

        $timestamp = Timestamp::fromS($s);

        $this->assertNotNull($timestamp);
        $this->assertEquals($s, $timestamp->toS());
        $this->assertEquals($s * 1000, $timestamp->toMs());
    }
}
