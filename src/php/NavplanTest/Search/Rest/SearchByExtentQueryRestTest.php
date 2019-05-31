<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\RestSearchByExtentQuery;
use PHPUnit\Framework\TestCase;


class SearchByExtentQueryRestTest extends TestCase {
    private $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByExtentQuery::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByExtentQuery::ARG_MIN_LON => "7.0",
            RestSearchByExtentQuery::ARG_MIN_LAT => "47.0",
            RestSearchByExtentQuery::ARG_MAX_LON => "7.9",
            RestSearchByExtentQuery::ARG_MAX_LAT => "47.9",
            RestSearchByExtentQuery::ARG_ZOOM => "11",
            RestSearchByExtentQuery::ARG_MIN_NOTAM_TIME => "1558819678",
            RestSearchByExtentQuery::ARG_MAX_NOTAM_TIME => "1558919678",
            RestSearchByExtentQuery::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = RestSearchByExtentQuery::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->extent->minPos->longitude);
        $this->assertEquals(47.0, $query->extent->minPos->latitude);
        $this->assertEquals(7.9, $query->extent->maxPos->longitude);
        $this->assertEquals(47.9, $query->extent->maxPos->latitude);
        $this->assertEquals(11, $query->zoom);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
        $this->assertEquals(NULL, $query->token);
    }
}
