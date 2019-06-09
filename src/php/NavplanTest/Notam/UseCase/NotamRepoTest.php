<?php declare(strict_types=1);

namespace NavplanTest\Notam\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Notam\UseCase\SearchNotam;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use PHPUnit\Framework\TestCase;


class NotamRepoTest extends TestCase {
    /* @var $notamRepo MockNotamRepo */
    private $notamRepo;
    /* @var $searchNotam SearchNotam */
    private $searchNotam;
    /* @var $expectedResult array */
    private $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyNotam1::create(), DummyNotam2::create(), DummyNotam3::create() ];
        $config = new MockNavplanConfig();
        $this->notamRepo = $config->getNotamRepo();
        $this->notamRepo->pushMockResult($this->expectedResult);
        $this->searchNotam = new SearchNotam($config);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchNotam);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->searchNotam->searchByExtent($extent, 11, 1558819678, 1559819678);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
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
