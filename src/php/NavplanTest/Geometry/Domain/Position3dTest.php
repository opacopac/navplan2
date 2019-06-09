<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position3d;
use PHPUnit\Framework\TestCase;


class Position3dTest extends TestCase {
    public function test__construct() {
        $alt = new Altitude(1500, AltitudeUnit::FT, AltitudeReference::MSL);

        $pos = new Position3d(7.0, 47.0, $alt);

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
        $this->assertEquals($alt, $pos->altitude);
    }
}
