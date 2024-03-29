<?php declare(strict_types=1);

namespace NavplanTest\Traffic\OgnRepo;

use Navplan\Traffic\OgnRepo\OgnDbRepoTrafficConverter;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Traffic\Mocks\DummyOgnDumpFile12345;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic4;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic5;
use PHPUnit\Framework\TestCase;


class OgnRepoTrafficTest extends TestCase {
    private MockTimeService $timeService;


    protected function setUp(): void {
        $this->timeService = new MockTimeService();
    }

    public function test_fromResponse() {
        $ognLine1 = DummyOgnDumpFile12345::createDumpFileLine1();
        $ognLine2 = DummyOgnDumpFile12345::createDumpFileLine2();
        $ognLine3 = DummyOgnDumpFile12345::createDumpFileLine3();
        $ognLine4 = DummyOgnDumpFile12345::createDumpFileLine4();
        $ognLine5 = DummyOgnDumpFile12345::createDumpFileLine5();
        $this->timeService->strtotimeRelativeDate = DummyOgnDumpFile12345::getDate();

        $ac1 = OgnDbRepoTrafficConverter::fromDumpFileLine($ognLine1, $this->timeService);
        $ac2 = OgnDbRepoTrafficConverter::fromDumpFileLine($ognLine2, $this->timeService);
        $ac3 = OgnDbRepoTrafficConverter::fromDumpFileLine($ognLine3, $this->timeService);
        $ac4 = OgnDbRepoTrafficConverter::fromDumpFileLine($ognLine4, $this->timeService);
        $ac5 = OgnDbRepoTrafficConverter::fromDumpFileLine($ognLine5, $this->timeService);

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
