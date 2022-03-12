<?php declare(strict_types=1);

namespace NavplanTest\IcaoChartCh\DomainModel;

use Navplan\Common\DomainModel\Position2d;
use Navplan\IcaoChartCh\DomainModel\Ch1903Chart;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use Navplan\IcaoChartCh\DomainModel\XyPair;
use NavplanTest\IcaoChartCh\Mocks\SpyImage;
use PHPUnit\Framework\TestCase;


class IcaoChartChTest extends TestCase {
    private SpyImage $spyImage;
    private XyPair $pixelPos1;
    private XyPair $pixelPos2;
    private Ch1903Coordinate $chCoord1;
    private Ch1903Coordinate $chCoord2;
    private Ch1903Chart $icaoChartCh;


    protected function setUp(): void {
        $this->spyImage = new SpyImage(100, 200, 'green');
        $this->pixelPos1 = new XyPair(0, 0);
        $this->pixelPos2 = new XyPair(100, 200);
        $this->chCoord1 = new Ch1903Coordinate(600000, 200000);
        $this->chCoord2 = new Ch1903Coordinate(600000 + 100, 200000 - 200);
        $this->icaoChartCh = Ch1903Chart::fromPos1AndPos2($this->spyImage, $this->pixelPos1, $this->chCoord1, $this->pixelPos2, $this->chCoord2);
    }


    public function test__construct() {
        $this->assertNotNull($this->icaoChartCh);
    }


    public function test_getTLCoord() {
        $chCoordTL = $this->icaoChartCh->getTLCoord();

        $this->assertEquals(600000, $chCoordTL->east);
        $this->assertEquals(200000, $chCoordTL->north);
    }


    public function test_getBRCoord() {
        $chCoordBR = $this->icaoChartCh->getBRCoord();

        $this->assertEquals(600100 + (0 - 1), $chCoordBR->east);
        $this->assertEquals(200000 - (200 - 1), $chCoordBR->north);
    }


    public function test_luftfahrtkarteCh() {
        $spyImg = new SpyImage(8250, 5200);
        $pixelPos1 = new XyPair(135, 4246);
        $chCoord1 = Ch1903Coordinate::fromPos2d(new Position2d(5.5, 46.0));
        $pixelPos2 = new XyPair(7751, 858);
        $chCoord2 = Ch1903Coordinate::fromPos2d(new Position2d(10.5, 47.5));
        $icaoChart = Ch1903Chart::fromPos1AndPos2($spyImg, $pixelPos1, $chCoord1, $pixelPos2, $chCoord2);

        //$posTL = $icaoChart->getTLCoord()->toPos2d();
        $posBR = $icaoChart->getBRCoord()->toPos2d();

        $this->assertEqualsWithDelta(10.7, $posBR->longitude, 0.1);
        $this->assertEqualsWithDelta(45.5, $posBR->latitude, 0.1);
    }
}
