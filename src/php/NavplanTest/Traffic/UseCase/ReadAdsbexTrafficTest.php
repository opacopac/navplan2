<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Traffic\Domain\TrafficAdsbexReadRequest;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\MockAdsbexRepo;
use PHPUnit\Framework\TestCase;


class ReadAdsbexTrafficTest extends TestCase {
    /* @var $adsbexGateway MockAdsbexRepo */
    private $adsbexGateway;
    /* @var $readAdsbexTraffic ReadAdsbexTraffic */
    private $readAdsbexTraffic;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->adsbexGateway = $config->getAdsbexGateway();
        $this->readAdsbexTraffic = new ReadAdsbexTraffic($config);
    }


    public function test_read() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();
        $this->adsbexGateway->readTrafficResult = [$traffic1, $traffic2, $traffic3];

        $trafficList = $this->readAdsbexTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(3, count($trafficList));
        $this->assertEquals($traffic1, $trafficList[0]);
        $this->assertEquals($traffic2, $trafficList[1]);
        $this->assertEquals($traffic3, $trafficList[2]);
        $this->assertEquals(7.25, $this->adsbexGateway->readTrafficArgs[0]->longitude);
        $this->assertEquals(47.25, $this->adsbexGateway->readTrafficArgs[0]->latitude);
        $this->assertEquals(round(168610.37301284972), round($this->adsbexGateway->readTrafficArgs[1]->getValue(LengthUnit::M)));
    }
}
