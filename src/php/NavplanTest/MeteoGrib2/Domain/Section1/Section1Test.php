<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ProductionStatus;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyDataType1;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyReferenceTime1;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use PHPUnit\Framework\TestCase;


class Section1Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection1_1::create();

        $this->assertEquals(215, $section->getOrigin()->getCenter());
        $this->assertEquals(4, $section->getOrigin()->getSubcenter());
        $this->assertEquals(2, $section->getTableVersion()->getMaster());
        $this->assertEquals(0, $section->getTableVersion()->getLocal());
        $this->assertEquals(DummyReferenceTime1::create(), $section->getReferenceTime());
        $this->assertEquals(new ProductionStatus(ProductionStatus::OPERATIONAL_PRODUCTS), $section->getProductionStatus());
        $this->assertEquals(DummyDataType1::create(), $section->getProcessedDataType());
    }
}
