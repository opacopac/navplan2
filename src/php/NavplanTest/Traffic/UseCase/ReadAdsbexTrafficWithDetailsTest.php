<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Traffic\Domain\TrafficAdsbexReadRequest;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\MockAdsbexRepo;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use PHPUnit\Framework\TestCase;


class ReadAdsbexTrafficWithDetailsTest extends TestCase {
    /* @var $readAdsbexTrafficWithDetails ReadAdsbexTrafficWithDetails */
    private $readAdsbexTrafficWithDetails;
    /* @var $adsbexGateway MockAdsbexRepo */
    private $adsbexGateway;
    /* @var $trafficDetailRepo MockTrafficDetailRepo */
    private $trafficDetailRepo;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->adsbexGateway = $config->getAdsbexGateway();
        $this->trafficDetailRepo = $config->getTrafficDetailRepo();
        $this->readAdsbexTrafficWithDetails = new ReadAdsbexTrafficWithDetails($config);
    }


    public function test_read() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
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
        $this->assertEquals(1, count($trafficList));
        $this->assertEquals($expected->adsbTraffic, $trafficList[0]->adsbTraffic);
        $this->assertEquals($expected->acClass, $trafficList[0]->acClass);
        $this->assertEquals($expected->engClass, $trafficList[0]->engClass);
    }


    public function test_read_no_details() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $request = new TrafficAdsbexReadRequest($extent);
        $adsbTraffic1 = DummyAdsbexTraffic1::create();
        $expected = DummyAdsbexTrafficWithDetails1::create();
        $this->adsbexGateway->readTrafficResult = [$adsbTraffic1];
        $this->trafficDetailRepo->readDetailsFromLfrChResult = [];
        $this->trafficDetailRepo->readDetailsFromBasestationResult = [];
        $this->trafficDetailRepo->readDetailsFromIcaoAcTypesResult = [];

        $trafficList = $this->readAdsbexTrafficWithDetails->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(1, count($trafficList));
        $this->assertEquals($expected->adsbTraffic, $trafficList[0]->adsbTraffic);
        $this->assertEquals(NULL, $trafficList[0]->acClass);
        $this->assertEquals(NULL, $trafficList[0]->engClass);
    }
}
