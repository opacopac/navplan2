<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\UseCase\NavaidSearch;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\RepoGateway\NavaidRepoMock;
use PHPUnit\Framework\TestCase;


class NavaidSearchTest extends TestCase {
    private $navaidRepoMock;
    private $navaidSearch;
    private $expectedResult;


    private function getNavaidRepoMock(): NavaidRepoMock {
        return $this->navaidRepoMock;
    }


    private function getNavaidSearch(): NavaidSearch {
        return $this->navaidSearch;
    }


    protected function setUp(): void {
        $this->expectedResult = array(DummyNavaid1::create(), DummyNavaid1::create());
        $this->navaidRepoMock = new NavaidRepoMock($this->expectedResult);
        $this->navaidSearch = new NavaidSearch($this->navaidRepoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->navaidSearch);
    }


    public function test_searchByExtent() {
        $navaidResult = $this->getNavaidSearch()->searchByExtent(7.0, 47.0, 7.9, 47.9, 11);
        $this->assertEquals(count($this->expectedResult), count($navaidResult));

        $callParamList = $this->getNavaidRepoMock()->searchByExtentParams;
        $this->assertEquals(1, count($callParamList));
        $this->assertEquals(7.0, $callParamList[0][0]);
        $this->assertEquals(47.0, $callParamList[0][1]);
        $this->assertEquals(7.9, $callParamList[0][2]);
        $this->assertEquals(47.9, $callParamList[0][3]);
        $this->assertEquals(11, $callParamList[0][4]);
    }


    public function test_searchByText() {
        $navaidResult = $this->getNavaidSearch()->searchByText("FRI", 10);
        $this->assertEquals(count($this->expectedResult), count($navaidResult));

        $callParamList = $this->getNavaidRepoMock()->searchByTextParams;
        $this->assertEquals(1, count($callParamList));
        $this->assertEquals("FRI", $callParamList[0][0]);
        $this->assertEquals(10, $callParamList[0][1]);
    }


    public function test_searchByPosition() {
        $navaidResult = $this->getNavaidSearch()->searchByPosition(7.0, 47.0, 0.5, 10);
        $this->assertEquals(count($this->expectedResult), count($navaidResult));

        $callParamList = $this->getNavaidRepoMock()->searchByPositionParams;
        $this->assertEquals(1, count($callParamList));
        $this->assertEquals(7.0, $callParamList[0][0]);
        $this->assertEquals(47.0, $callParamList[0][1]);
        $this->assertEquals(0.5, $callParamList[0][2]);
        $this->assertEquals(10, $callParamList[0][3]);
    }
}
