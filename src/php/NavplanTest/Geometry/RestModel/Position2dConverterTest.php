<?php declare(strict_types=1);

namespace NavplanTest\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\RestModel\Position2dConverter;
use PHPUnit\Framework\TestCase;


class Position2dConverterTest extends TestCase {
    public function test_toRest() {
        $pos = new Position2d(7.0, 47.0);

        $rest = Position2dConverter::toRest($pos);

        $this->assertNotNull($rest);
        $this->assertEquals(7.0, $rest[0]);
        $this->assertEquals(47.0, $rest[1]);
    }


    public function test_toRest_with_rounding() {
        $pos = new Position2d(7.5555, 47.4444);

        $rest = Position2dConverter::toRest($pos, 3);

        $this->assertNotNull($rest);
        $this->assertEquals(7.556, $rest[0]);
        $this->assertEquals(47.444, $rest[1]);
    }
}
