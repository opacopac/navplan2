<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\UseCase;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\UseCase\NavaidSearch;
use NavplanTest\OpenAip\RepoGateway\NavaidRepositoryMock;
use PHPUnit\Framework\TestCase;


class NavaidSearchTest extends TestCase {
    private $navaidRepoMock;
    private $navaidSearch;
    private $expectedResult;


    private function getNavaidRepoMock(): NavaidRepositoryMock {
        return $this->navaidRepoMock;
    }


    private function getNavaidSearch(): NavaidSearch {
        return $this->navaidSearch;
    }


    private function createDummyNavaid1(): Navaid {
        return new Navaid(
            1218,
            "VOR-DME",
            "FRI",
            "FRIBOURG",
            46.7775,
            7.22361,
            799,
            "110.85",
            "MHz",
            1.34846,
            false
        );
    }


    protected function setUp(): void {
        $this->expectedResult = array($this->createDummyNavaid1(), $this->createDummyNavaid1());
        $this->navaidRepoMock = new NavaidRepositoryMock($this->expectedResult);
        $this->navaidSearch = new NavaidSearch($this->navaidRepoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->navaidSearch);
    }


    public function test_SearchByExtent() {
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


    public function test_SearchByText() {
        $navaidResult = $this->getNavaidSearch()->searchByText("FRI", 10);
        $this->assertEquals(count($this->expectedResult), count($navaidResult));

        $callParamList = $this->getNavaidRepoMock()->searchByTextParams;
        $this->assertEquals(1, count($callParamList));
        $this->assertEquals("FRI", $callParamList[0][0]);
        $this->assertEquals(10, $callParamList[0][1]);
    }


    public function test_SearchByPosition() {
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
