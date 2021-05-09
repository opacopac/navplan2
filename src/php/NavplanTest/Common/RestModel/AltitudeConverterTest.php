<?php declare(strict_types=1);

namespace NavplanTest\Common\RestModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\RestModel\RestAltitudeConverter;
use PHPUnit\Framework\TestCase;


class AltitudeConverterTest extends TestCase {
    public function test_toArray() {
        $alt = Altitude::fromFtAmsl(10);
        $rest = RestAltitudeConverter::toRest($alt);

        $this->assertNotNull($rest);
        $this->assertEquals(10, $rest[0]);
        $this->assertEquals("FL", $rest[1]);
        $this->assertEquals("STD", $rest[2]);
    }
}
