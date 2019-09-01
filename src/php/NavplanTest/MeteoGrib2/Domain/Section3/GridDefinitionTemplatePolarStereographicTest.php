<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use Navplan\MeteoGrib2\Domain\Section3\LatLon;
use Navplan\MeteoGrib2\Domain\Section3\ProjectionCenter;
use Navplan\MeteoGrib2\Domain\Section3\ResolutionAndComponentFlags;
use Navplan\MeteoGrib2\Domain\Section3\ScanningMode;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShape1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplatePolarStereographic1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplatePolarStereographicTest extends TestCase {
    public function test_create_instance() {
        $template = DummyGridDefinitionTemplatePolarStereographic1::create();

        $this->assertEquals(DummyEarthShape1::create(), $template->getShapeOfEarth());
        $this->assertEquals(5, $template->getNumPointsXAxis());
        $this->assertEquals(5, $template->getNumPointsYAxis());
        $this->assertEquals(new LatLon(40.000001, 349.999999), $template->getFirstGridPoint());
        $this->assertEquals(new ResolutionAndComponentFlags(false, false, true), $template->getResolutionComponentsFlags());
        $this->assertEquals(new LatLon(40.000001, 0.0), $template->getLatDlonV());
        $this->assertEquals(100000000, $template->getXDirectionGridLength());
        $this->assertEquals(100000000, $template->getYDirectionGridLength());
        $this->assertEquals(new ProjectionCenter(true, false), $template->getProjectionCenter());
        $this->assertEquals(new ScanningMode(true, true, true, true, false, false, false, false), $template->getScanningMode());
    }
}
