<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\SearchByPositionQueryRest;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchByPositionQueryRestTest extends TestCase {
    private $args;
    private $config;


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
        $this->args = array(
            SearchByPositionQueryRest::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByPositionQueryRest::ARG_LON => "7.0",
            SearchByPositionQueryRest::ARG_LAT => "47.0",
            SearchByPositionQueryRest::ARG_RADIUS => "0.5",
            SearchByPositionQueryRest::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = SearchByPositionQueryRest::fromArray($this->args, $this->config);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->position->longitude);
        $this->assertEquals(47.0, $query->position->latitude);
        $this->assertEquals(0.5, $query->maxRadius_deg);
        $this->assertEquals(NULL, $query->email);
    }
}
