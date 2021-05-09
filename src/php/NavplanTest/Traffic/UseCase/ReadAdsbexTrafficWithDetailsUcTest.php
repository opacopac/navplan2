<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Traffic\DomainModel\TrafficAdsbexReadRequest;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\ReadAdsbexTrafficWithDetailsUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\MockAdsbexService;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use PHPUnit\Framework\TestCase;


class ReadAdsbexTrafficWithDetailsUcTest extends TestCase {
    private ReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetails;
    private MockAdsbexService $adsbexGateway;
    private MockTrafficDetailRepo $trafficDetailRepo;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->adsbexGateway = $config->adsbexRepo;
        $this->trafficDetailRepo = $config->trafficDetailRepo;
        $this->readAdsbexTrafficWithDetails = $config->getReadAdsbexTrafficWithDetailsUc();
    }


    public function test_read() {
        $extent = Extent2d::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $adsbTraffic1 = DummyAdsbexTraffic1::create();
        $trafficDetail1 = DummyIcaoAcTypeTrafficDetail1::create();
        $expected = DummyAdsbexTrafficWithDetails1::create();
        $this->adsbexGateway->readTrafficResult = [$adsbTraffic1];
        $this->trafficDetailRepo->readDetailsFromLfrChResult = [];
        $this->trafficDetailRepo->readDetailsFromBasestationResult = [];
        $this->trafficDetailRepo->readDetailsFromIcaoAcTypesResult = [$trafficDetail1];

        $trafficList = $this->readAdsbexTrafficWithDetails->read($request);

        $this->assertNotNull($trafficList);
        $this->assertCount(1, $trafficList);
        $this->assertEquals($expected->adsbTraffic, $trafficList[0]->adsbTraffic);
        $this->assertEquals($expected->acClass, $trafficList[0]->acClass);
        $this->assertEquals($expected->engClass, $trafficList[0]->engClass);
    }


    public function test_read_no_details() {
        $extent = Extent2d::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $adsbTraffic1 = DummyAdsbexTraffic1::create();
        $expected = DummyAdsbexTrafficWithDetails1::create();
        $this->adsbexGateway->readTrafficResult = [$adsbTraffic1];
        $this->trafficDetailRepo->readDetailsFromLfrChResult = [];
        $this->trafficDetailRepo->readDetailsFromBasestationResult = [];
        $this->trafficDetailRepo->readDetailsFromIcaoAcTypesResult = [];

        $trafficList = $this->readAdsbexTrafficWithDetails->read($request);

        $this->assertNotNull($trafficList);
        $this->assertCount(1, $trafficList);
        $this->assertEquals($expected->adsbTraffic, $trafficList[0]->adsbTraffic);
        $this->assertEquals(NULL, $trafficList[0]->acClass);
        $this->assertEquals(NULL, $trafficList[0]->engClass);
    }
}
