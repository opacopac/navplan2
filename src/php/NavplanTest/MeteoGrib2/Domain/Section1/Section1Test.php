<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section1;

use DateTime;
use Navplan\MeteoGrib2\Domain\Section1\ProductionStatus;
use Navplan\MeteoGrib2\Domain\Section1\ReferenceTimeSignificance;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyDataType1;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use PHPUnit\Framework\TestCase;


class Section1Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection1_1::create();

        $this->assertEquals(215, $section->getOriginCenter());
        $this->assertEquals(4, $section->getOriginSubcenter());
        $this->assertEquals(2, $section->getGribMasterTableVersion());
        $this->assertEquals(0, $section->getGribLocalTableVersion());
        $this->assertEquals(new ReferenceTimeSignificance(ReferenceTimeSignificance::START_OF_FORECAST), $section->getSignificanceReferenceTime());
        $this->assertEquals(DateTime::createFromFormat('Y-m-d H:i:s', '2019-08-26 14:03:34'), $section->getReferenceTime());
        $this->assertEquals(new ProductionStatus(ProductionStatus::OPERATIONAL_PRODUCTS), $section->getProductionStatus());
        $this->assertEquals(DummyDataType1::create(), $section->getProcessedDataType());
    }
}
