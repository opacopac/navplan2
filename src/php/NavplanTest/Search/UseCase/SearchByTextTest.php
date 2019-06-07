<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByText;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Search\Mocks\MockSearchConfig;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByTextTest extends TestCase {
    private $config;


    private function getConfig(): MockSearchConfig {
        return $this->config;
    }


    private function getUserPointRepoMock(): MockUserPointRepo {
        $repo = $this->getConfig()->getUserRepoFactory()->createUserPointRepo();
        return $repo instanceof MockUserPointRepo ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new MockSearchConfig();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByTextQuery(
            [],
            "LSZB",
            UserHelper::createToken("asdf@asef.com", FALSE)
        );
        $result = SearchByText::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->airports));
        $this->assertEquals(0, count($result->navaids));
        $this->assertEquals(0, count($result->airspaces));
        $this->assertEquals(0, count($result->reportingPoints));
        $this->assertEquals(0, count($result->userPoints));
        $this->assertEquals(0, count($result->webcams));
        $this->assertEquals(0, count($result->geonames));
        $this->assertEquals(0, count($result->notams));
    }


    public function test_search_only_in_userPoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            UserHelper::createToken("asdf@asef.com", FALSE)
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ] ;
        $this->getUserPointRepoMock()->pushMockResult($upResults);
        // TODO: geoname

        $result = SearchByText::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(count($upResults), count($result->userPoints));
        $this->assertEquals(0, count($result->geonames));
    }


    public function test_search_no_token_no_userpoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            NULL
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->getUserPointRepoMock()->pushMockResult($upResults);

        $result = SearchByText::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->userPoints));
    }
}
