<?php declare(strict_types=1);

namespace NavplanTest\Meteo\Domain;

use Navplan\Geometry\Domain\Extent;
use Navplan\Meteo\Domain\ReadSmaMeasurementsRequest;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsRequestTest extends TestCase {
    public function test__construct() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $request = new ReadSmaMeasurementsRequest($extent);

        $this->assertNotNull($request);
        $this->assertEquals($extent, $request->extent);
    }
}
