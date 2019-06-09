<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Rest;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Rest\RestPosition2d;
use PHPUnit\Framework\TestCase;


class RestPosition2dTest extends TestCase {
    public function test_toRest() {
        $pos = new Position2d(7.0, 47.0);

        $rest = RestPosition2d::toRest($pos);

        $this->assertNotNull($rest);
        $this->assertEquals(7.0, $rest[0]);
        $this->assertEquals(47.0, $rest[1]);
    }


    public function test_toRest_with_rounding() {
        $pos = new Position2d(7.5555, 47.4444);

        $rest = RestPosition2d::toRest($pos, 3);

        $this->assertNotNull($rest);
        $this->assertEquals(7.556, $rest[0]);
        $this->assertEquals(47.444, $rest[1]);
    }
}
