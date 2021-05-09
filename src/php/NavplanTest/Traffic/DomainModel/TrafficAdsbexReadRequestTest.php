<?php declare(strict_types=1);

namespace NavplanTest\Traffic\DomainModel;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Traffic\DomainModel\TrafficAdsbexReadRequest;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexReadRequestTest extends TestCase {
    public function test_create_instance() {
        $extent = new Extent2d(new Position2d(7.0, 47.0), new Position2d(7.9, 47.9));
        $request = new TrafficAdsbexReadRequest($extent);

        $this->assertNotNull($request);
        $this->assertEquals($extent, $request->extent);
    }
}
