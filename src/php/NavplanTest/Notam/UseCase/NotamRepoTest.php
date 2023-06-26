<?php declare(strict_types=1);

namespace NavplanTest\Notam\UseCase;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Notam\DomainModel\ReadNotamByExtentRequest;
use Navplan\Notam\UseCase\SearchNotam\SearchNotamUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use PHPUnit\Framework\TestCase;


class NotamRepoTest extends TestCase {
    private MockNotamRepo $notamRepo;
    private SearchNotamUc $searchNotam;
    private array $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyNotam1::create(), DummyNotam2::create(), DummyNotam3::create() ];
        $config = new MockNavplanDiContainer();
        $this->notamRepo = $config->notamService;
        $this->notamRepo->pushMockResult($this->expectedResult);
        $this->searchNotam = $config->getSearchNotamUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchNotam);
    }


    public function test_searchByExtent() {
        $extent = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $request = new ReadNotamByExtentRequest($extent, 11, 1558819678, 1559819678);
        $result = $this->searchNotam->searchByExtent($request);
        $this->assertEquals(count($this->expectedResult), count($result->notams));
        $this->assertEquals($this->expectedResult[0], $result->notams[0]);
        $this->assertEquals($this->expectedResult[1], $result->notams[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->searchNotam->searchByPosition($pos, 1558819678, 1559819678, 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByIcao() {
        $result = $this->searchNotam->searchByIcao(["LSZB", "LSGE"], 1558819678, 1559819678);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
