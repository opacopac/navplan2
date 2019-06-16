<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Traffic\OgnRepo\OgnRepoTraffic;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Traffic\Mocks\DummyOgnDumpFile12345;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic4;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic5;
use PHPUnit\Framework\TestCase;


class OgnTrafficTest extends TestCase {
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

        $ac1 = OgnRepoTraffic::fromDumpFileLine($ognLine1, $this->timeService);
        $ac2 = OgnRepoTraffic::fromDumpFileLine($ognLine2, $this->timeService);
        $ac3 = OgnRepoTraffic::fromDumpFileLine($ognLine3, $this->timeService);
        $ac4 = OgnRepoTraffic::fromDumpFileLine($ognLine4, $this->timeService);
        $ac5 = OgnRepoTraffic::fromDumpFileLine($ognLine5, $this->timeService);

        $this->assertNotNull($ac1);
        $this->assertEquals(DummyOgnTraffic1::create(), $ac1);
        $this->assertNotNull($ac2);
        $this->assertEquals(DummyOgnTraffic2::create(), $ac2);
        $this->assertNotNull($ac3);
        $this->assertEquals(DummyOgnTraffic3::create(), $ac3);
        $this->assertNotNull($ac4);
        $this->assertEquals(DummyOgnTraffic4::create(), $ac4);
        $this->assertNotNull($ac5);
        $this->assertEquals(DummyOgnTraffic5::create(), $ac5);
    }
}
