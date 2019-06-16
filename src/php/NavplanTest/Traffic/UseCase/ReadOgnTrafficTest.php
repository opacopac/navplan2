<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\TimeUnit;
use Navplan\Traffic\Domain\TrafficOgnReadRequest;
use Navplan\Traffic\UseCase\ReadOgnTraffic;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic4;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic5;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition5;
use NavplanTest\Traffic\Mocks\MockOgnRepo;
use PHPUnit\Framework\TestCase;


class ReadOgnTrafficTest extends TestCase {
    /* @var $ognGateway MockOgnRepo */
    private $ognGateway;
    /* @var $readOgnTraffic ReadOgnTraffic */
    private $readOgnTraffic;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->ognGateway = $config->getOgnGateway();
        $this->readOgnTraffic = new ReadOgnTraffic($config);
    }


    public function test_read() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sesionId);
        $traffic1 = DummyOgnTraffic1::create();
        $traffic2 = DummyOgnTraffic2::create();
        $traffic3 = DummyOgnTraffic3::create();
        $this->ognGateway->isListenerRunningResult = FALSE;
        $this->ognGateway->readTrafficResult = [$traffic1, $traffic2, $traffic3];

        $trafficList = $this->readOgnTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(3, count($trafficList));
        $this->assertEquals($traffic1, $trafficList[0]);
        $this->assertEquals($traffic2, $trafficList[1]);
        $this->assertEquals($traffic3, $trafficList[2]);
        $this->assertEquals($sesionId, $this->ognGateway->setFilterArgs[0]);
        $this->assertEquals($extent, $this->ognGateway->setFilterArgs[1]);
        $this->assertEquals($sesionId, $this->ognGateway->isListenerRunningArgs[0]);
        $this->assertEquals($sesionId, $this->ognGateway->startListenerArgs[0]);
        $this->assertEquals($sesionId, $this->ognGateway->readTrafficArgs[0]);
    }


    public function test_read_listener_already_running() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sesionId);
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [];

        $trafficList = $this->readOgnTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(0, count($trafficList));
        $this->assertEquals($sesionId, $this->ognGateway->setFilterArgs[0]);
        $this->assertEquals($extent, $this->ognGateway->setFilterArgs[1]);
        $this->assertEquals($sesionId, $this->ognGateway->isListenerRunningArgs[0]);
        $this->assertEquals(NULL, $this->ognGateway->startListenerArgs);
        $this->assertEquals($sesionId, $this->ognGateway->readTrafficArgs[0]);
    }


    public function test_read_filter_identical_timestamps() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sesionId);
        $pos1 = DummyOgnTrafficPosition1::create();
        $pos2 = DummyOgnTrafficPosition5::create();
        $pos2->position->timestamp = $pos1->position->timestamp;
        $traffic1 = DummyOgnTraffic1::create();
        $traffic1->positionList = [$pos1, $pos2];
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [$traffic1];

        $trafficList = $this->readOgnTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(1, count($trafficList));
        $this->assertEquals(1, count($trafficList[0]->positionList));
    }


    public function test_read_filter_identical_positions() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sesionId);
        $pos1 = DummyOgnTrafficPosition1::create();
        $pos2 = DummyOgnTrafficPosition5::create();
        $pos2->position->latitude = $pos1->position->latitude;
        $pos2->position->longitude = $pos1->position->longitude;
        $traffic1 = DummyOgnTraffic1::create();
        $traffic1->positionList = [$pos1, $pos2];
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [$traffic1];

        $trafficList = $this->readOgnTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(1, count($trafficList));
        $this->assertEquals(1, count($trafficList[0]->positionList));
    }


    public function test_read_grouping_filtering() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new TrafficOgnReadRequest($extent, $maxAge, $sesionId);
        $traffic1 = DummyOgnTraffic1::create();
        $traffic2 = DummyOgnTraffic2::create();
        $traffic3 = DummyOgnTraffic3::create();
        $traffic4 = DummyOgnTraffic4::create();
        $traffic5 = DummyOgnTraffic5::create();
        $this->ognGateway->isListenerRunningResult = TRUE;
        $this->ognGateway->readTrafficResult = [$traffic1, $traffic2, $traffic3, $traffic4, $traffic5];

        $trafficList = $this->readOgnTraffic->read($request);

        $this->assertNotNull($trafficList);
        $this->assertEquals(3, count($trafficList));
        $this->assertEquals(2, count($trafficList[0]->positionList));
        $this->assertEquals(1, count($trafficList[1]->positionList));
        $this->assertEquals(1, count($trafficList[2]->positionList));
    }
}
