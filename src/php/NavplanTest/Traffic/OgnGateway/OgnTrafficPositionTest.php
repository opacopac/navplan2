<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Traffic\OgnRepo\OgnRepoTrafficPosition;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Traffic\Mocks\DummyOgnDumpFile12345;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition2;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition3;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition4;
use NavplanTest\Traffic\Mocks\DummyOgnTrafficPosition5;
use PHPUnit\Framework\TestCase;


class OgnTrafficPositionTest extends TestCase {
    /* @var $timeService MockTimeService */
    private $timeService;


    protected function setUp(): void {
        $systemServiceFactory = new MockSystemServiceFactory();
        $this->timeService = $systemServiceFactory->getTimeService();
    }

    public function test_fromResponse() {
        $ognLine1 = DummyOgnDumpFile12345::createDumpFileLine1();
        $ognLine2 = DummyOgnDumpFile12345::createDumpFileLine2();
        $ognLine3 = DummyOgnDumpFile12345::createDumpFileLine3();
        $ognLine4 = DummyOgnDumpFile12345::createDumpFileLine4();
        $ognLine5 = DummyOgnDumpFile12345::createDumpFileLine5();
        $this->timeService->strtotimeRelativeDate = DummyOgnDumpFile12345::getDate();

        $pos1 = OgnRepoTrafficPosition::fromDumpFileLine($ognLine1, $this->timeService);
        $pos2 = OgnRepoTrafficPosition::fromDumpFileLine($ognLine2, $this->timeService);
        $pos3 = OgnRepoTrafficPosition::fromDumpFileLine($ognLine3, $this->timeService);
        $pos4 = OgnRepoTrafficPosition::fromDumpFileLine($ognLine4, $this->timeService);
        $pos5 = OgnRepoTrafficPosition::fromDumpFileLine($ognLine5, $this->timeService);

        $this->assertNotNull($pos1);
        $this->assertEquals(DummyOgnTrafficPosition1::create(), $pos1);
        $this->assertNotNull($pos2);
        $this->assertEquals(DummyOgnTrafficPosition2::create(), $pos2);
        $this->assertNotNull($pos3);
        $this->assertEquals(DummyOgnTrafficPosition3::create(), $pos3);
        $this->assertNotNull($pos4);
        $this->assertEquals(DummyOgnTrafficPosition4::create(), $pos4);
        $this->assertNotNull($pos5);
        $this->assertEquals(DummyOgnTrafficPosition5::create(), $pos5);
    }
}
