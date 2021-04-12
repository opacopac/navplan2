<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position4d;
use Navplan\Geometry\DomainModel\Timestamp;
use PHPUnit\Framework\TestCase;


class Position4dTest extends TestCase {
    public function test__construct() {
        $alt = new Altitude(1500, AltitudeUnit::FT, AltitudeReference::MSL);
        $timestamp = Timestamp::fromMs(1560000429704);

        $pos = new Position4d(7.0, 47.0, $alt, $timestamp);

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
        $this->assertEquals($alt, $pos->altitude);
        $this->assertEquals($timestamp, $pos->timestamp);
    }
}
