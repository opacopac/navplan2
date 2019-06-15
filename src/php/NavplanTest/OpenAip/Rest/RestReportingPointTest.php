<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\Rest\RestReportingPoint;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use PHPUnit\Framework\TestCase;


class RestReportingPointTest extends TestCase {
    public function test_toArray_ReportingPoint() {
        $rep = DummyReportingPoint1::create();

        $rpRest = RestReportingPoint::toRest($rep);

        $this->assertEquals(DummyReportingPoint1::createRest(), $rpRest);
    }
}
