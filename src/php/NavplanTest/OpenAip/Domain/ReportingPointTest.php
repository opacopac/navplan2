<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Domain;

use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use PHPUnit\Framework\TestCase;


class ReportingPointTest extends TestCase {
    public function test__construct() {
        $instance = DummyReportingPoint1::create();
        $this->assertNotNull($instance);
    }


    public function test__construct2() {
        $instance = DummyReportingSector1::create();
        $this->assertNotNull($instance);
    }
}
