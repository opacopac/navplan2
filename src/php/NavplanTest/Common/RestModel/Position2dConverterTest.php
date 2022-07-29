<?php declare(strict_types=1);

namespace NavplanTest\Common\RestModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use PHPUnit\Framework\TestCase;


class Position2dConverterTest extends TestCase {
    public function test_toRest() {
        $pos = new Position2d(7.0, 47.0);

        $rest = RestPosition2dConverter::toRest($pos);

        $this->assertNotNull($rest);
        $this->assertEquals(7.0, $rest[0]);
        $this->assertEquals(47.0, $rest[1]);
    }


    public function test_toRest_with_rounding() {
        $pos = new Position2d(7.5555, 47.4444);

        $rest = RestPosition2dConverter::toRest($pos, 3);

        $this->assertNotNull($rest);
        $this->assertEquals(7.556, $rest[0]);
        $this->assertEquals(47.444, $rest[1]);
    }
}
