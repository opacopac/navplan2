<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position4d;
use Navplan\Geometry\Domain\Timestamp;
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
