<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome\RestService;

use Navplan\AerodromeReporting\Rest\Converter\RestReportingPointConverter;
use NavplanTest\Aerodrome\Mocks\DummyReportingPoint1;
use PHPUnit\Framework\TestCase;


class ReportingPointConverterTest extends TestCase {
    public function test_toArray_ReportingPoint() {
        $rep = DummyReportingPoint1::create();

        $rpRest = RestReportingPointConverter::toRest($rep);

        $this->assertEquals(DummyReportingPoint1::createRest(), $rpRest);
    }
}
