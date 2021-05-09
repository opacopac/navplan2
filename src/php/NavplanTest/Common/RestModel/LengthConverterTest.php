<?php declare(strict_types=1);

namespace NavplanTest\Common\RestModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\RestModel\RestLengthConverter;
use PHPUnit\Framework\TestCase;


class LengthConverterTest extends TestCase {
    public function test_toArray() {
        $len = new Length(10.5, LengthUnit::M);
        $rest = RestLengthConverter::toRest($len);

        $this->assertNotNull($rest);
        $this->assertEquals(10.5, $rest[0]);
        $this->assertEquals("M", $rest[1]);
    }
}
