<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\UseCase\SearchNavaid;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\OpenAip\Mocks\MockOpenAipConfig;
use PHPUnit\Framework\TestCase;


class SearchNavaidTest extends TestCase {
    /* @var $navaidRepo MockNavaidRepo */
    private $navaidRepo;
    /* @var $searchNavaid SearchNavaid */
    private $searchNavaid;
    /* @var $expectedResult array */
    private $expectedResult;


    protected function setUp(): void {
        $this->expectedResult = [ DummyNavaid1::create(), DummyNavaid1::create() ];
        $config = new MockOpenAipConfig();
        $this->navaidRepo = $config->getOpenAipRepoFactory()->createNavaidRepo();
        $this->navaidRepo->pushMockResult($this->expectedResult);
        $this->searchNavaid = new SearchNavaid($config);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchNavaid);
    }


    public function test_searchByExtent() {
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $result = $this->searchNavaid->searchByExtent($extent, 11);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByText() {
        $result = $this->searchNavaid->searchByText("FRI", 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $result = $this->searchNavaid->searchByPosition($pos, 0.5, 10);
        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
    }
}
