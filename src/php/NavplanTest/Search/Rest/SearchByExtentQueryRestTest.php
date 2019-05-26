<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\SearchByExtentQueryRest;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchByExtentQueryRestTest extends TestCase {
    private $args;
    private $config;


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
        $this->args = array(
            SearchByExtentQueryRest::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByExtentQueryRest::ARG_MIN_LON => "7.0",
            SearchByExtentQueryRest::ARG_MIN_LAT => "47.0",
            SearchByExtentQueryRest::ARG_MAX_LON => "7.9",
            SearchByExtentQueryRest::ARG_MAX_LAT => "47.9",
            SearchByExtentQueryRest::ARG_ZOOM => "11",
            SearchByExtentQueryRest::ARG_MIN_NOTAM_TIME => "1558819678",
            SearchByExtentQueryRest::ARG_MAX_NOTAM_TIME => "1558919678",
            SearchByExtentQueryRest::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = SearchByExtentQueryRest::fromArray($this->args, $this->config);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->extent->minPos->longitude);
        $this->assertEquals(47.0, $query->extent->minPos->latitude);
        $this->assertEquals(7.9, $query->extent->maxPos->longitude);
        $this->assertEquals(47.9, $query->extent->maxPos->latitude);
        $this->assertEquals(11, $query->zoom);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
        $this->assertEquals(NULL, $query->email);
    }
}
