<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\RestModel\SearchByPositionQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByPositionQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            SearchByPositionQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByPositionQueryConverter::ARG_LON => "7.0",
            SearchByPositionQueryConverter::ARG_LAT => "47.0",
            SearchByPositionQueryConverter::ARG_RADIUS => "0.5",
            SearchByPositionQueryConverter::ARG_MIN_NOTAM_TIME => "1558819678",
            SearchByPositionQueryConverter::ARG_MAX_NOTAM_TIME => "1558919678",
            SearchByPositionQueryConverter::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = SearchByPositionQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->position->longitude);
        $this->assertEquals(47.0, $query->position->latitude);
        $this->assertEquals(0.5, $query->maxRadius_deg);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
        $this->assertEquals(NULL, $query->token);
    }
}
