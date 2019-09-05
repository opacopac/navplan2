<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use Navplan\MeteoGrib2\Domain\Section3\LatLon;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShape1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplate20_1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyProjectionCenter1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyResolutionAndComponentFlags1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyScanningMode1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplatePolarStereographicTest extends TestCase {
    public function test_create_instance() {
        $template = DummyGridDefinitionTemplate20_1::create();

        $this->assertEquals(DummyEarthShape1::create(), $template->getShapeOfEarth());
        $this->assertEquals(5, $template->getNumPointsXAxis());
        $this->assertEquals(5, $template->getNumPointsYAxis());
        $this->assertEquals(new LatLon(40.000001, 349.999999), $template->getFirstGridPoint());
        $this->assertEquals(DummyResolutionAndComponentFlags1::create(), $template->getResolutionComponentsFlags());
        $this->assertEquals(new LatLon(40.000001, 0.0), $template->getLatDlonV());
        $this->assertEquals(100000000, $template->getXDirectionGridLength());
        $this->assertEquals(100000000, $template->getYDirectionGridLength());
        $this->assertEquals(DummyProjectionCenter1::create(), $template->getProjectionCenter());
        $this->assertEquals(DummyScanningMode1::create(), $template->getScanningMode());
    }
}
