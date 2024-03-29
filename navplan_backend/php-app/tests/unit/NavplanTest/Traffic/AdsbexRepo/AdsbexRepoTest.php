<?php declare(strict_types=1);

namespace NavplanTest\Traffic\AdsbexRepo;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Traffic\Adsbex\Service\AdsbexService;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\Traffic\Mocks\DummyAdsbexResponse123;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class AdsbexRepoTest extends TestCase {
    private MockFileService $fileService;
    private AdsbexService $adsbGateway;


    protected function setUp(): void {
        $this->fileService = new MockFileService();
        $this->adsbGateway = new AdsbexService($this->fileService);
    }


    public function test__construct() {
        $this->assertNotNull($this->adsbGateway);
    }


    public function test_readTraffic() {
        $pos = new Position2d(7.1, 47.1);
        $dist = new Length(10, LengthUnit::NM);
        $this->fileService->fileGetContentsResult = DummyAdsbexResponse123::createAdsbexResponse();

        $trafficList = $this->adsbGateway->readTraffic($pos, $dist);

        $this->assertCount(3, $trafficList);
        $this->assertEquals(DummyAdsbexTraffic1::create(), $trafficList[0]);
        $this->assertEquals(DummyAdsbexTraffic2::create(), $trafficList[1]);
        $this->assertEquals(DummyAdsbexTraffic3::create(), $trafficList[2]);
        $this->assertRegExp('/http/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/7\.1/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/47\.1/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertRegExp('/10/', $this->fileService->fileGetContentsArgs[0]);
        $this->assertNotNull($this->fileService->fileGetContentsArgs[2]); // http context (auth)
    }
}
