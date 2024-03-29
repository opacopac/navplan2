<?php declare(strict_types=1);

namespace NavplanTest\Traffic\TrafficDetailRepo;

use Navplan\Traffic\TrafficDetail\Model\DbTrafficDetailConverter;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail3;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail4;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use PHPUnit\Framework\TestCase;


class DbTrafficDetailTest extends TestCase {
    public function test_fromLfrChResult() {
        $dbResult = DummyLfrchTrafficDetail1::createDbResult();

        $result = DbTrafficDetailConverter::fromLfrChRow($dbResult);

        $this->assertEquals(DummyLfrchTrafficDetail1::create(), $result);
    }


    public function test_fromBasestationResult() {
        $dbResult1 = DummyBasestationTrafficDetail1::createDbResult();
        $dbResult2 = DummyBasestationTrafficDetail2::createDbResult();

        $result1 = DbTrafficDetailConverter::fromBasestationRow($dbResult1);
        $result2 = DbTrafficDetailConverter::fromBasestationRow($dbResult2);

        $this->assertEquals(DummyBasestationTrafficDetail1::create(), $result1);
        $this->assertEquals(DummyBasestationTrafficDetail2::create(), $result2);
    }


    public function test_fromIcaoAcTypeResult() {
        $dbResult1 = DummyIcaoAcTypeTrafficDetail1::createDbResult();
        $dbResult2 = DummyIcaoAcTypeTrafficDetail2::createDbResult();
        $dbResult3 = DummyIcaoAcTypeTrafficDetail3::createDbResult();
        $dbResult4 = DummyIcaoAcTypeTrafficDetail4::createDbResult();

        $result1 = DbTrafficDetailConverter::fromIcaoAcTypeRow($dbResult1);
        $result2 = DbTrafficDetailConverter::fromIcaoAcTypeRow($dbResult2);
        $result3 = DbTrafficDetailConverter::fromIcaoAcTypeRow($dbResult3);
        $result4 = DbTrafficDetailConverter::fromIcaoAcTypeRow($dbResult4);

        $this->assertEquals(DummyIcaoAcTypeTrafficDetail1::create(), $result1);
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail2::create(), $result2);
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail3::create(), $result3);
        $this->assertEquals(DummyIcaoAcTypeTrafficDetail4::create(), $result4);
    }
}
