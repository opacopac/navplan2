<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section5;

use NavplanTest\MeteoGrib2\Mocks\Section5\DummyDataRepresentationTemplate0_1;
use PHPUnit\Framework\TestCase;


class DataRepresentationTemplate0Test extends TestCase {
    public function test_create_instance() {
        $template = DummyDataRepresentationTemplate0_1::create();

        $this->assertEquals(0, $template->getTemplateNumber());
        $this->assertEquals(53400.0, $template->getReferenceValue());
        $this->assertEquals(0, $template->getBinaryScaleFactor());
        $this->assertEquals(1, $template->getDecimalScaleFactor());
        $this->assertEquals(11, $template->getBitsUsed());
    }
}
