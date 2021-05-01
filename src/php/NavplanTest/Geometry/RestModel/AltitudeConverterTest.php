<?php declare(strict_types=1);

namespace NavplanTest\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\RestModel\AltitudeConverter;
use PHPUnit\Framework\TestCase;


class AltitudeConverterTest extends TestCase {
    public function test_toArray() {
        $alt = Altitude::fromFtAmsl(10);
        $rest = AltitudeConverter::toRest($alt);

        $this->assertNotNull($rest);
        $this->assertEquals(10, $rest[0]);
        $this->assertEquals("FL", $rest[1]);
        $this->assertEquals("STD", $rest[2]);
    }
}
