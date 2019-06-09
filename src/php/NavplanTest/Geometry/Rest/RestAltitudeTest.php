<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Rest;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Rest\RestAltitude;
use PHPUnit\Framework\TestCase;


class RestAltitudeTest extends TestCase {
    public function test_toArray() {
        $alt = new Altitude(10, AltitudeUnit::FL, AltitudeReference::STD);
        $rest = RestAltitude::toRest($alt);

        $this->assertNotNull($rest);
        $this->assertEquals(10, $rest[0]);
        $this->assertEquals("FL", $rest[1]);
        $this->assertEquals("STD", $rest[2]);
    }
}
