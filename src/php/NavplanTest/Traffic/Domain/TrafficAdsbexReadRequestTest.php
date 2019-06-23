<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Traffic\Domain\TrafficAdsbexReadRequest;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexReadRequestTest extends TestCase {
    public function test_create_instance() {
        $extent = new Extent(new Position2d(7.0, 47.0), new Position2d(7.9, 47.9));
        $request = new TrafficAdsbexReadRequest($extent);

        $this->assertNotNull($request);
        $this->assertEquals($extent, $request->extent);
    }
}
