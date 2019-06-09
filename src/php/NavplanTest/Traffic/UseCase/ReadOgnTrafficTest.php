<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\TimeUnit;
use Navplan\System\UseCase\IFileService;
use Navplan\Traffic\Domain\ReadTrafficRequest;
use Navplan\Traffic\UseCase\ReadOgnTraffic;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic4;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic5;
use NavplanTest\Traffic\Mocks\MockOgnGateway;
use NavplanTest\Traffic\Mocks\MockTrafficConfig;
use PHPUnit\Framework\TestCase;


class ReadOgnTrafficTest extends TestCase {
    /* @var $ognGateway MockOgnGateway */
    private $ognGateway;
    /* @var $readOgnTraffic ReadOgnTraffic */
    private $readOgnTraffic;


    protected function setUp(): void {
        $config = new MockTrafficConfig();
        $this->ognGateway = $config->getOgnGateway();
        $this->readOgnTraffic = new ReadOgnTraffic($config);
    }


    public function test_read() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new ReadTrafficRequest($extent, $maxAge, $sesionId);
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
        $request = new ReadTrafficRequest($extent, $maxAge, $sesionId);
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


    public function test_read_group_by_ac_and_filter_duplicate_pos() {
        $extent = Extent::createFromCoords(6.0, 46.0, 8.5, 48.5);
        $maxAge = new Time(120, TimeUnit::S);
        $sesionId = 123;
        $request = new ReadTrafficRequest($extent, $maxAge, $sesionId);
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
