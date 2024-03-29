<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Traffic\DomainModel\TrafficAdsbexReadRequest;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\ReadAdsbexTrafficUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\MockAdsbexService;
use PHPUnit\Framework\TestCase;


class ReadAdsbexTrafficUcTest extends TestCase {
    private MockAdsbexService $adsbexGateway;
    private ReadAdsbexTrafficUc $readAdsbexTraffic;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->adsbexGateway = $config->adsbexRepo;
        $this->readAdsbexTraffic = $config->getReadAdsbexTrafficUc();
    }


    public function test_read() {
        $extent = Extent2d::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();
        $this->adsbexGateway->readTrafficResult = [$traffic1, $traffic2, $traffic3];

        $trafficList = $this->readAdsbexTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertCount(3, $trafficList);
        $this->assertEquals($traffic1, $trafficList[0]);
        $this->assertEquals($traffic2, $trafficList[1]);
        $this->assertEquals($traffic3, $trafficList[2]);
        $this->assertEquals(7.25, $this->adsbexGateway->readTrafficArgs[0]->longitude);
        $this->assertEquals(47.25, $this->adsbexGateway->readTrafficArgs[0]->latitude);
        $this->assertEquals(round(168610.37301284972), round($this->adsbexGateway->readTrafficArgs[1]->getValue(LengthUnit::M)));
    }


    public function test_read_empty_list() {
        $extent = Extent2d::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $this->adsbexGateway->readTrafficResult = [];

        $trafficList = $this->readAdsbexTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertCount(0, $trafficList);
    }
}
