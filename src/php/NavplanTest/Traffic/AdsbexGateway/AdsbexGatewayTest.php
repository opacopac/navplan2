<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Traffic\AdsbexGateway\AdsbexGateway;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use NavplanTest\Traffic\Mocks\DummyAdsbexResponse123;
use PHPUnit\Framework\TestCase;


class AdsbexGatewayTest extends TestCase {
    /* @var $fileService MockFileService */
    private $fileService;
    /* @var $adsbGateway AdsbexGateway */
    private $adsbGateway;


    protected function setUp(): void {
        $this->fileService = new MockFileService();
        $this->adsbGateway = new AdsbexGateway($this->fileService);
    }


    public function test__construct() {
        $this->assertNotNull($this->adsbGateway);
    }


    public function test_readTraffic() {
        $pos = new Position2d(7.1, 47.1);
        $dist = new Length(10, LengthUnit::NM);
        $this->fileService->fileGetContentsResult = DummyAdsbexResponse123::createAdsbexResponse();

        $trafficList = $this->adsbGateway->readTraffic($pos, $dist);

        $this->assertEquals(3, count($trafficList));
        $this->assertEquals(DummyAdsbexTraffic1::create(), $trafficList[0]);
        $this->assertEquals(DummyAdsbexTraffic2::create(), $trafficList[1]);
        $this->assertEquals(DummyAdsbexTraffic3::create(), $trafficList[2]);
        $this->assertRegExp('/http/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/7\.1/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/47\.1/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/10/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertNotNull($this->fileService->fileGetContentsArgs[2]);
    }
}
