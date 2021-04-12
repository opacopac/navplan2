<?php declare(strict_types=1);

namespace NavplanTest\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\RestModel\LengthConverter;
use PHPUnit\Framework\TestCase;


class LengthConverterTest extends TestCase {
    public function test_toArray() {
        $len = new Length(10.5, LengthUnit::M);
        $rest = LengthConverter::toRest($len);

        $this->assertNotNull($rest);
        $this->assertEquals(10.5, $rest[0]);
        $this->assertEquals("M", $rest[1]);
    }
}
