<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DomainModel;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\MeteoSma\UseCase\ReadSmaMeasurements\ReadSmaMeasurementsRequest;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsRequestTest extends TestCase {
    public function test__construct() {
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $request = new ReadSmaMeasurementsRequest($extent);

        $this->assertNotNull($request);
        $this->assertEquals($extent, $request->extent);
    }
}
