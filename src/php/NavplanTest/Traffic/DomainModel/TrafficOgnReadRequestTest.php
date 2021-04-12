<?php declare(strict_types=1);

namespace NavplanTest\Traffic\DomainModel;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Time;
use Navplan\Geometry\DomainModel\TimeUnit;
use Navplan\Traffic\DomainModel\TrafficOgnReadRequest;
use PHPUnit\Framework\TestCase;


class TrafficOgnReadRequestTest extends TestCase {
    public function test_create_instance() {
        $extent = new Extent(new Position2d(7.0, 47.0), new Position2d(7.9, 47.9));
        $maxAge = new Time(120, TimeUnit::S);
        $sessionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sessionId);

        $this->assertNotNull($request);
        $this->assertEquals($extent, $request->extent);
        $this->assertEquals($maxAge, $request->maxAge);
        $this->assertEquals($sessionId, $request->sessionId);
    }
}
